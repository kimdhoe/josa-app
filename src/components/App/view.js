import { div, h1, input, p, span } from '@cycle/dom'

const renderHeader = () =>
  div( '.Header'
     , [ h1('.Header-title', ['Josa Test REPL'])
       , p( '.Header-description'
          , [ span('.Header-josa', [ '#{은}' ]), span('.Header-josa', [ '#{는}'])
            , span('.Header-josa', [ '#{이}' ]), span('.Header-josa', [ '#{가}'])
            , span('.Header-josa', [ '#{을}' ]), span('.Header-josa', [ '#{를}'])
            , span('.Header-josa', [ '#{와}' ]), span('.Header-josa', [ '#{과}'])
            , span('.Header-josa', [ '#{이어}' ]), span('.Header-josa', [ '#{여}'])
            , span('.Header-josa', [ '#{으로}' ]), span('.Header-josa', [ '#{로}'])
            , span('.Header-josa', [ '#{이에요}' ]), span('.Header-josa', [ '#{예요}'])
            , span('.Header-josa', [ '#{이었}' ]), span('.Header-josa', [ '#{였}'])
            , span('.Header-josa', [ '#{아}' ]), span('.Header-josa', [ '#{야}'])
            , span('.Header-josa', [ '#{이?}' ])
            ]
          )
       ]
     )

const renderOutput = ({ subject, result: { text, failed } }) => {
  return div( '.Output'
            , [ p('.Output-subject',                             [ subject ])
              , p(`.Output-result ${failed ? '.is-error' : ''}`, [ text ])
              ]
            )
}

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
