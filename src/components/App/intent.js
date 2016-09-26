import xs       from 'xstream'
import debounce from 'xstream/extra/debounce'

const KEY_ENTER = 13
const KEY_UP    = 38
const KEY_DOWN  = 40
const KEY_K     = 75
const KEY_L     = 76
const KEY_U     = 85

const intent = domSource => {
  const edit$ = domSource.select('.Prompt-input').events('input')
    .compose(debounce(100))
    .filter(e => [ KEY_ENTER, KEY_UP, KEY_DOWN ].indexOf(e.keyCode) < 0)
    .map(e => e.target.value)
    .map(text => ({ type: 'edit', text }))

  const submit$ = domSource.select('.Prompt-input').events('keyup')
    .filter(e => e.keyCode === KEY_ENTER)
    .map(e => e.target.value.trim())
    .filter(text => text)
    .map(text => ({ type: 'submit', text }))

  const keyDown$ = domSource.select('.Prompt-input').events('keydown')

  const goPrev$ = keyDown$
    .filter(e => e.keyCode === KEY_UP)
    .map(e => { e.preventDefault(); return e })
    .map(e =>({ type: 'goPrev' }))

  const goNext$ = keyDown$
    .filter(e => e.keyCode === KEY_DOWN)
    .map(e => { e.preventDefault(); return e })
    .map(e =>({ type: 'goNext' }))

  const clear$ = keyDown$
    .filter(e => (e.metaKey && e.keyCode === KEY_K)
              || (e.ctrlKey && e.keyCode === KEY_L)
           )
    .map(e => ({ type: 'clear' }))

  const clearLine$ = keyDown$
    .filter(e => e.ctrlKey && e.keyCode === KEY_U
           )
    .map(e => ({ type: 'clearLine' }))

  const action$ = xs.merge(edit$, submit$, goPrev$, goNext$, clear$, clearLine$)

  return action$
}

export default intent
