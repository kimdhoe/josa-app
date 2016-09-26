import xs   from 'xstream'

import view   from './view'
import intent from './intent'
import model  from './model'

const App = sources => {
  const action$ = intent(sources.DOM)
  const { state$
        , outputs$
        , prompt$
        }       = model(action$)
  const vdom$   = view(state$)

  const blur$ = sources.DOM.select('.Prompt-input').events('blur')

  return { DOM:     vdom$
         , printed: outputs$
         , focus:   xs.combine(prompt$.filter(p => p.shouldFocus) , blur$)
                      .map(([ p, e ]) => e)

         }
}

export default App
