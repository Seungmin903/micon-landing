# 서비스 화면 반영 원칙

`demo.html#screens` (‘당신의 손안에서, MICON은 이렇게’) 영역의 다섯 화면만 현재 Android 코드 기반 재현을 사용합니다. 첫 화면의 개발 캡처와 상단 PPT 시연 영상은 그대로 유지합니다.

| 앱 둘러보기 화면 | 자산 | Android 코드 근거 |
| --- | --- | --- |
| 목소리 분석 | `analysis-current.svg` | `ui/report/VoiceReportSections.kt`, `VoiceSimilarityGraphCard.kt`, `RangeReportCards.kt` |
| 맞춤곡 추천 | `recommend-deck.svg` | `ui/recommend/RecommendDeckScreen.kt`, `ui/design/organisms/CdPlayer.kt` |
| 곡 적합도·키 | `match-current.svg` | `ui/songdetail/SongDetailScreen.kt` |
| 노래 연습 | `practice-current.svg` | `ui/practice/PracticeScreen.kt` |
| 찜·세트리스트 | `favorites-current.svg` | `ui/favorites/FavoritesScreens.kt` |

제공된 Android 체크아웃 `8ca428e2`와 디자인 토큰의 색·구성을 대조했습니다. 앱 런타임을 직접 렌더링한 스크린샷은 아니므로 코드 기반 재현으로 표시합니다. 곡·수치·가사 안내는 예시이며, 긴 화면은 주요 구성을 발췌했습니다.

홈 로고는 PPT 원본 글자와 마이크를 사용합니다. 중앙 마이크 축소 → I 자리로 이동 → 글자 등장 → 로고 전체 뒤 배경이 밝아지는 순서이며 마이크 자체에 밝기 필터를 적용하지 않습니다.
