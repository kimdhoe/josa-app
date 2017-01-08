# Josa App

[Josa](https://github.com/kimdhoe/josa) 라이브러리를 간편하게 시험해볼 수 있는 REPL 형식의 웹 프로그램입니다.

## https://kimdhoe.github.io/josa-app

## 사용법

- Josa의 메인 함수가 받는 인자와 같은 형식의 문자열을 입력하고 엔터 키를 누릅니다.

  ```
  > 친구#{이} 선생님#{와} 함께 학교#{으로} 갑니다
  친구가 선생님과 함께 학교로 갑니다
  > 1 + 1#{는} 2#{이?}다
  1 + 1은 2다
  >
  ```

- 위/아래 화살표 키로 이전/다음 입력들을 다시 불러올 수 있습니다. 새로 작성 중인 문자열은 이전/다음 입력에서 돌아올 때까지 그대로 유지됩니다.
