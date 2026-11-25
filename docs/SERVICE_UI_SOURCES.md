# 서비스 화면 반영 원칙

기존 실제 앱 캡처와 본선 PPT 시연 영상을 유지합니다. 원본과 맞지 않는 부분만 수정합니다.

| 화면 | 사용 자산 | 형식 |
| --- | --- | --- |
| 목소리 분석 | `assets/screens/10_report_result.png` | 실제 개발 캡처 |
| 맞춤곡 추천 | `assets/screens/recommend-deck.svg` | 현재 CD 플레이어 코드 기반 재현, 예시 곡 |
| 곡 적합도·키 | `assets/screens/17_song_match.png` | 실제 개발 캡처 |
| 노래 연습 | `assets/screens/14_practice.png` | 실제 개발 캡처 |
| 찜·세트리스트 | `assets/screens/09_favorites.png` | 실제 개발 캡처 |
| 움직이는 서비스 소개 | `assets/motion/*.mp4` | 본선 PPT의 실제 앱 시연, 상태표시줄 크롭 유지 |

추천 화면은 `RecommendDeckScreen.kt`, `CdPlayer.kt`, `CompactDisc.kt`와 디자인 토큰을 대조했습니다. 실제 앱 실행 캡처는 아니므로 별도로 표시합니다. 나머지 개발 캡처는 현재 앱과 차이가 있을 수 있음을 안내합니다.

홈 로고는 PPT 원본 글자와 마이크를 사용합니다. 중앙 마이크 축소 → I 자리로 이동 → 글자 등장 → 로고 전체 뒤 배경이 밝아지는 순서이며 마이크 자체에 밝기 필터를 적용하지 않습니다.
