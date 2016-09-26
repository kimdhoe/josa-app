import { div, h1, input, p, span } from '@cycle/dom'

const listOfJosa =
  [ '은', '는', '이', '가', '을', '를', '와', '과', '이어', '여', '으로', '로', '이에요', '예요', '이었', '였', '아', '야', '이?' ]

const renderHeader = () =>
  div( '.Header'
     , [ h1('.Header-title', ['Josa Test REPL'])
       , p( '.Header-description'
          , listOfJosa.map(josa => span('.Header-josa', [ `#{${josa}}` ]))
          )
       ]
     )

const renderOutput = ({ subject, result: { text, failed } }) =>
  div( '.Output'
     , [ p('.Output-subject',                             [ subject ])
       , p(`.Output-result ${failed ? '.is-error' : ''}`, [ text ])
       ]
     )

const renderOutputs = outputs =>
  div('.Outputs', outputs.map(renderOutput))

const renderPrompt = (value, shouldFocus) =>
  div( '.Prompt'
     , [ span('.Prompt-symbol', [ '> ' ])
       , input( '.Prompt-input'
              , { props: { type: 'text', value }
                , hook:  { insert: vnode => { vnode.elm.focus() } }
                }
              )
       ]

     )

const view = state$ =>
  state$.map(({ text, current, outputs, shouldFocus }) =>
    div([ renderHeader()
        , renderOutputs(outputs)
        , renderPrompt(text, shouldFocus)
        ]
       )
  )

export default view
