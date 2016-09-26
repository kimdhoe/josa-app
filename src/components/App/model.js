import xs   from 'xstream'
import josa from 'josa'

// An Output is an object: { subject: string
//                         , result:  Result
//                         }
//
// A Result is an object: { text:   string
//                        , failed: boolean
//                        }

// string * boolean -> Result
const mkResult = (text, failed) => (
  { text, failed }
)

// string -> Output
const mkOutput = text => {
  const subject = '> ' + text

  try {
    return { subject
           , result:  mkResult(josa(text), false)
           }
  } catch (e) {
    return { subject
           , result:  mkResult(e.message, true)
           }
  }
}

// A Prompt is an object: { edited:      Array<string>
//                        , history:     History
//                        , current:     number
//                        , shouldFocus: boolean
//                        }
//
// A History is an Array<string>.
//   - The submitted items are appended to the front.
//     The first item (empty string) is a placeholder for the new text.
//     The second item is the most recently submitted text.

// string * History -> History
// Inserts a given history item into aHistory.
const pushHistoryItem = (x, history) =>
  history[1] === x
    ? history
    : [ '', x, ...history.slice(1, 31) ]

const initialPrompt = { edited:      [ '' ]
                      , history:     []
                      , current:     0
                      , shouldFocus: true
                      }

const outputsModel = action$ =>
  action$.fold(
      (acc, x) => {
        switch (x.type) {
          case 'submit':
            return [ ...acc, mkOutput(x.text) ]
          case 'clear':
            return []
          default:
            return acc
        }
      }
    , []
  )

const promptModel = action$ =>
  action$.fold(
    (acc, x) => {
      switch (x.type) {
        case 'edit':
          const edited = acc.edited.slice()
          edited[acc.current] = x.text

          return { ...acc
                 , edited
                 , shouldFocus: false
                 }
        case 'submit':
          return { edited:      [ '' ]
                 , history:     pushHistoryItem(x.text, acc.history)
                 , current:     0
                 , shouldFocus: false
                 }
        case 'goPrev':
          if (acc.current >= acc.history.length - 1)
            return acc

          return { ...acc
                 , current:     acc.current + 1
                 , shouldFocus: true
                 }
        case 'goNext':
          if (acc.current <= 0)
            return acc

          return { ...acc
                 , current:     acc.current - 1
                 , shouldFocus: true
                 }
        case 'clearLine':
          return { ...acc
                 , edited: [ ...acc.edited.slice(0, acc.current)
                           , ''
                           , ...acc.edited.slice(acc.current + 1)
                           ]
                 }
        default:
          return acc
      }
    }
  , initialPrompt
  )

const model = (action$) => {
  const outputs$ = outputsModel(action$)
  const prompt$  = promptModel(action$)

  return { state$: xs.combine(prompt$, outputs$)
             .map(([ { edited, history, current, shouldFocus }, outputs ]) => (
               { text:        typeof edited[current] === 'string'
                                ? edited[current]
                                : history[current]
               , current:     current
               , shouldFocus: shouldFocus
               , outputs
               }
             ))
         , outputs$: outputs$
         , prompt$:  prompt$
         }
}

export default model
