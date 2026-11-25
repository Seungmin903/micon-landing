# 서비스 화면의 코드 근거

제공된 `S15P21B110` Android 체크아웃(HEAD `8ca428e2`)을 대조했습니다. 아래 경로는 `frontend/android/app/src/main/java/com/micon/app/` 기준입니다.

| 웹 화면 | Kotlin 근거 | 반영한 구성 |
| --- | --- | --- |
| 목소리 분석 | `ui/report/VoiceReportSections.kt`, `VoiceSimilarityGraphCard.kt`, `RangeReportCards.kt` | 닮은 가수 목록 → 나를 중심으로 한 유사도 그래프 → 이번에 확인한 음역 |
| 맞춤곡 추천 | `ui/recommend/RecommendDeckScreen.kt`, `ui/design/organisms/CdPlayer.kt` | 추천 분류 칩, 빈 CD 플레이어, 위로 끌어 올리는 곡 카드 |
| 곡 상세와 키 | `ui/songdetail/SongDetailScreen.kt` | CD 헤더, 음역 매치, 내 음역과 곡 음역 범례, 키 조절, 어려운 구간, 연습 시작 |
| 실시간 연습 | `ui/practice/PracticeScreen.kt` | 진행 바, 키 조절, 점수와 Perfect 판정, 간주 건너뛰기, 목표 음표와 음정 궤적, 가사 영역, 되돌리기·일시정지·마치기 |
| 찜·세트리스트 | `ui/favorites/FavoritesScreens.kt` | 검색, 찜·세트리스트 폴더 탭, CD 형태 곡 목록과 하트 |
| 공통 | `ui/design/tokens/Colors.kt`, `Space.kt`, `Shape.kt`, `ui/design/atoms/CompactDisc.kt`, `ui/design/organisms/FloatingNavBar.kt` | 라벤더 배경, 보라·분홍 범례, 카드 모서리, CD 허브, 분석·추천·연습·기록·찜 하단 알약 내비게이션 |

실제 앱 렌더러를 실행한 스크린샷은 아닙니다. 웹에서 서비스를 설명하기 위한 벡터 재현이며 네트워크·음성 분석·곡 재생 기능은 실행하지 않습니다. 긴 화면은 주요 구성만 발췌했습니다. 폰트·아이콘·기기별 치수는 Android 렌더링과 다를 수 있습니다.

가수·곡명·수치·구간은 예시입니다. 가사 영역에는 실제 노래 가사 대신 안내 예문을 넣었습니다. 움직이는 버전의 선 그리기와 강조 효과는 설명용이며 앱 동작의 녹화가 아닙니다. 정지 버전은 `*-current.svg`, 설명용 움직임은 `*-current-motion.svg`입니다. 생성 스크립트는 `scripts/build_service_ui.py`입니다.

PPT 영상은 하단 ‘발표 당시의 실제 앱 시연’에 별도로 보존했습니다. 과거 스켈레톤 PNG는 현재 소개 화면에서 참조하지 않습니다.

홈 로고는 PPT 첫 장의 글자·마이크 원본을 나눠 사용합니다. 중앙 마이크 축소 → I 위치로 이동 → 글자 등장 → 로고 전체 뒤 배경이 밝아지는 순서입니다. 마이크 원본 자체에는 밝기나 광택 필터를 적용하지 않습니다.
