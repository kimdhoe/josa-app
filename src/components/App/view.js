import { a, div, em, h1, input, p, span } from '@cycle/dom'

const listOfJosa =
  [ '은', '는', '이', '가', '을', '를', '와', '과', '이어', '여', '으로', '로', '이에요', '예요', '이었', '였', '아', '야', '이?' ]

const renderHeader = () =>
  div( '.Header'
     , [ h1('.Header-title', [ 'JOSA TEST REPL' ])
       , p( '.Header-meta'
          , [ a( '.Header-author'
               , { props: { href: 'https://github.com/kimdhoe' } }
               , [ '©Kimdhoe' ]
               )
            , '. '
            , a( '.Header-link'
               , { props: { href: 'https://github.com/kimdhoe/josa' } }
               , [ '(GitHub)' ]
               )
            , a( '.Header-link'
               , { props: { href: 'https://www.npmjs.com/package/josa' } }
               , [ '(npm)' ]
               )
            ]
          )
       , p( '.Header-description'
       , [ a( { props: { href: 'https://github.com/kimdhoe/josa' } }
               , 'Josa'
               )
            , '는 동적으로 생성된 문자열에 적법한 조사를 선택/삽입하기 위해 만들어진 한글 관련 JavaScript 라이브러리입니다.'
            ]
          )
       , p( '.Header-description'
          , [ '이 REPL은 현재 '
            , a( { props: { href: 'https://www.npmjs.com/package/josa' } }
               , 'Josa@v2.0.1'
               )
            , '을 사용하고 있으며, 지원하는 플레이스홀더는 다음과 같습니다:'
            ]
          )
       , p( '.Header-josaList'
          , listOfJosa.map(josa => span('.Header-josa', [ `#{${josa}}` ]))
          )
       , p( '.Header-exampleTitle'
          , [ '예시:' ]
          )
       , p( '.Header-example'
          , [ '> 친구#{이} 선생님#{와} 함께 학교#{으로} 갑니다.' ]
          )
       , em( '.Header-example'
           , [ '친구가 선생님과 함께 학교로 갑니다.' ]
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
