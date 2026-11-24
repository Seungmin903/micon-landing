# MICON landing

MICON Android 앱의 실제 시연과 구현 과정을 소개하는 한국어 기술 포트폴리오입니다. 문제 정의, 시스템 구조, 알고리즘 선택, 상태 관리, 검증 근거와 팀 역할을 함께 담았습니다. 별도의 빌드와 패키지 설치 없이 동작하는 HTML, CSS, JavaScript로 구성했습니다.

## 로컬 실행

```powershell
python -m http.server 4174 --bind 127.0.0.1
```

브라우저에서 http://127.0.0.1:4174 를 엽니다. `index.html`을 직접 열어도 주요 기능이 동작합니다.

## 페이지 구성

| 메뉴 | 파일 | 내용 |
| --- | --- | --- |
| 프로젝트 소개 | `index.html` | 프로젝트 개요, 문제 정의, 각 페이지 요약 링크 |
| 서비스 시연 | `demo.html` | 실제 앱 시연, 모핑 전환, 화면 갤러리, FAQ |
| 기술·아키텍처 | `technology.html` | 시스템 구조, 데이터 흐름, 핵심 알고리즘과 키 비교 예시 |
| 개발 과정·검증 | `development.html` | 비동기 일관성, 실패 처리, 회귀 테스트와 운영 기록 |
| 팀 | `team.html` | 팀원과 역할, 프로젝트 저장소 |

상단 메뉴는 실제 HTML 페이지 사이를 이동하며, 현재 페이지에 `aria-current="page"`를 표시합니다. `pages.css`가 페이지 제목과 요약 링크, 다음 페이지 이동을 관리합니다. 기존 루트 주소의 `#features`, `#technology`, `#engineering`, `#validation`, `#team` 등은 `app.js`에서 해당 새 페이지로 연결합니다. 쿼리 문자열과 앵커도 유지합니다.

## 구성

- 서비스 소개, 기획 배경, 분석·추천·연습 기능, 실제 앱 화면 갤러리, 이용 흐름, 기술 소개, FAQ
- 키보드로 조작할 수 있는 화면 탭과 이미지 확대 다이얼로그
- 모바일 메뉴, 스크롤 등장 효과, 동작 줄이기 설정 지원
- 본선 발표 자료의 실제 앱 시연 영상과 스크롤에 연결된 화면·기기·배경 전환
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

### 본선 발표 자료의 서비스 시연

서비스 소개 영역은 제공된 `MICON PPT 본선용.zip`의 발표 자료에 포함된 실제 GIF를 사용합니다. 큰 GIF 원본을 그대로 내려받지 않고, 원본의 동작을 유지한 H.264 MP4로 변환했습니다. 음성 수집이나 실시간 분석 기능을 웹에서 실행하는 것이 아니라 앱 사용 장면을 보여줍니다.

| 장면 | 원본 슬라이드와 미디어 | 웹 자산 |
| --- | --- | --- |
| 음역 측정 | 9번, `ppt/media/image20.gif` | `assets/motion/voice-analysis.mp4` |
| 추천 키·적합도 | 15번, `ppt/media/image39.gif` | `assets/motion/recommended-key.mp4` |
| 실시간 연습 | 18번, `ppt/media/image40.gif` | `assets/motion/live-practice.mp4` |

세 영상은 소리가 없습니다. 원본 GIF의 상단 96px(Android 상태표시줄)을 잘라낸 후 인코딩했으며 포스터에도 같은 크롭을 적용했습니다. 포스터는 각 영상의 첫 프레임입니다. `motion.css`와 `motion.js`가 스크롤에 따른 장면 전환과 재생을 관리합니다. 화면에 보이는 활성 영상만 재생하고, 화면 밖으로 나가거나 브라우저 탭이 숨겨지면 멈춥니다. 모바일에서는 버튼으로 장면을 선택합니다. 사용자가 일시정지하거나 OS의 동작 줄이기를 켜면 자동 재생을 멈추고 정지 화면을 표시합니다. 전환은 동일한 프레임 안에서 화면 페이드와 크기·기울기·모서리·배경 형태의 변화로 구현했습니다.

## 기술 포트폴리오의 근거

`portfolio.css`와 `portfolio.js`가 아키텍처 흐름 선택과 추천 키 설명 예시를 구현합니다.

- 음색 모델 계약: `ai/recommend-server/timbre_recommender/contracts.py` (ECAPA 192차원, Singer-BYOL 1,000차원)
- 구간 추출: `embedding.py` (4초 창, 2초 hop)
- 추천 키: `pitch_range.py` (`vocal-range-keyshift-first-98-v3`, 가이드 프로필과 관찰 프로필 구분)
- 실시간 음정: `scoring/YinPitch.kt`, `LiveScorer.kt` (기기 내 계산, hop과 실측 지연을 구분)
- 음역 제출: `data/onboarding/BackendRangeAnalysisGateway.kt` (WAV·메타데이터 제출 후 서버 결과 조회)
- 비동기 일관성: `docs/profile-recommendation-refresh.md`, `RecommendationAfterCommitIntegrationTest.java`
- 운영 전환 수치: `docs/KEY_VARIANT_ROLLOUT.md`, 2026-09-21 기록. 881곡, 원키 포함 7키, 변경 키 5,286행. 현재 사용자 수·정확도·실측 처리속도가 아님
- 키 비교 그래프: 본선 발표 37–40번 슬라이드의 원키 71%, −1키 87%, −2키 93%, −3키 100% 설명 예시. 실제 음원 그래프·실시간 계산·서비스 정확도 지표로 표현하지 않음
- 팀 이름과 역할: 본선 발표 42번 슬라이드 원문. 특정 팀원에게 세부 구현 기여를 임의 배정하지 않음

발표 자료와 코드 문서의 음색 결합 가중치 설명에 버전 차이가 있어, 사이트에서는 가중치를 임의로 단일 수치로 확정하지 않았습니다. 테스트 섹션은 저장소 테스트 사례를 소개하며 앱 전체 테스트의 최신 실행 성공을 주장하지 않습니다.

## 디자인 참고

- [Emour](https://biainmaze0507-alt.github.io/emour-landing/): 서비스 배경에서 기능 설명으로 이어지는 구성
- [incident.io](https://incident.io/): 큰 타이포그래피, 여백, 제품 화면을 중심으로 한 설명 방식
- MICON 앱의 보라색 `#6C5CE7`과 원본 로고를 사용했습니다.

본문 폰트는 Pretendard(CDN, SIL Open Font License)이며 로드 실패 시 시스템 폰트로 표시됩니다. 제품 캡처와 로고는 로컬 파일로 제공됩니다.

## 배포

정적 파일을 그대로 호스팅하면 됩니다. 상대 경로를 사용하므로 GitHub Pages의 `/micon-landing/` 하위 경로에서도 동작합니다. GitHub Pages를 사용할 경우 저장소 Settings → Pages에서 `main` 브랜치의 `/(root)`를 선택합니다.
