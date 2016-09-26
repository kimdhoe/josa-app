import { run }           from '@cycle/xstream-run'
import { makeDOMDriver } from '@cycle/dom'

import App from './components/App'

import './style/index.scss'

const main = App

const makeScrollDriver = () => output$ => {
  output$.addListener(
    { next:     () => document.body.scrollTop = document.body.offsetHeight
    , error:    () => {}
    , complete: () => {}
    }
  )
}

const makeFocusDriver = () => focus$ => {
  focus$.addListener(
    { next:     e => e.target.focus()
    , error:    () => {}
    , complete: () => {}
    }
  )
}

const drivers =
  { DOM:     makeDOMDriver('#app')
  , printed: makeScrollDriver()
  , focus:   makeFocusDriver()
  }

run(main, drivers)
