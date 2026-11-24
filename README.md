# MICON landing

MICON Android 앱을 소개하는 한국어 반응형 랜딩페이지입니다. 별도의 빌드와 패키지 설치 없이 동작하는 HTML, CSS, JavaScript로 구성했습니다.

## 로컬 실행

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

브라우저에서 http://127.0.0.1:4174 를 엽니다. `index.html`을 직접 열어도 주요 기능이 동작합니다.

## 구성

- 서비스 소개, 기획 배경, 분석·추천·연습 기능, 실제 앱 화면 갤러리, 이용 흐름, 기술 소개, FAQ
- 키보드로 조작할 수 있는 화면 탭과 이미지 확대 다이얼로그
- 모바일 메뉴, 스크롤 등장 효과, 동작 줄이기 설정 지원
- 외부 서버 연결이나 음성 수집 없이 동작하는 소개 페이지

## 화면과 내용의 근거

제품 화면은 임의로 다시 그린 목업이 아니라 MICON Android 저장소의 실제 개발 캡처 원본입니다. 기능 설명은 해당 저장소의 Kotlin·Jetpack Compose 코드를 대조했습니다.

- 소스 기준 커밋: `8ca428e2c268442116f50a33c8a3d11bbf7f9b12`
- 캡처 원본: `frontend/android/docs/screenshots/`
- 로고 원본: `frontend/android/app/src/main/res/drawable-nodpi/micon_logo.png`
- 분석: `ui/report/ReportScreens.kt`
- 추천: `ui/recommend/RecommendScreens.kt`, `RecommendDeckScreen.kt`
- 곡 적합도: `ui/recommend/RecommendScreens.kt`
- 연습: `ui/practice/PracticeScreen.kt`
- 찜·세트리스트: `ui/favorites/FavoritesScreens.kt`

**캡처는 과거 스켈레톤/개발 버전입니다.** 원본 저장소의 `frontend/android/docs/README.md`에 현재 UI 기준 여부를 확인하기 전까지 참고 자료로 사용하라고 명시되어 있습니다. 따라서 페이지에서 개발 화면·예시 데이터·현재 버전과의 차이를 안내합니다. 최신 앱을 실행해 새로 촬영한 화면으로 오인하지 않도록 유지해야 합니다.

화면 갱신 시 `assets/screens/`의 이미지와 `app.js`의 화면 메타데이터를 함께 확인하세요. 스토어 링크나 소개 영상은 전달받은 실제 URL이 없으므로 임의로 생성하지 않았습니다.

## 디자인 참고

- [Emour](https://biainmaze0507-alt.github.io/emour-landing/): 서비스 배경에서 기능 설명으로 이어지는 구성
- [incident.io](https://incident.io/): 큰 타이포그래피, 여백, 제품 화면을 중심으로 한 설명 방식
- MICON 앱의 보라색 `#6C5CE7`과 원본 로고를 사용했습니다.

본문 폰트는 Pretendard(CDN, SIL Open Font License)이며 로드 실패 시 시스템 폰트로 표시됩니다. 제품 캡처와 로고는 로컬 파일로 제공됩니다.

## 배포

정적 파일을 그대로 호스팅하면 됩니다. 상대 경로를 사용하므로 GitHub Pages의 `/micon-landing/` 하위 경로에서도 동작합니다. GitHub Pages를 사용할 경우 저장소 Settings → Pages에서 `main` 브랜치의 `/(root)`를 선택합니다.
