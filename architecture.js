(() => {
  const map = document.querySelector('.system-map');
  if (!map) return;
  const detail = document.querySelector('#component-detail');
  const names = { android: 'Android', backend: 'Spring Boot', ai: 'FastAPI', mysql: 'MySQL', s3: 'Amazon S3' };
  const node = (role, input, steps, output, source) => ({ role, input, steps, output, source });
  const flows = {
    timbre: {
      label: '음색 분석·추천', active: ['android', 'backend', 'ai', 'mysql'],
      api: '보컬 WAV 제출 / 분석·추천 결과 조회', ai: 'WAV 추론 요청 / 컴포넌트 콜백 / 추천 작업 조회',
      text: '보컬 녹음에서 두 종류의 음색 벡터를 만든 뒤, 저장한 음역·선호 정보와 함께 추천 후보를 계산합니다. 모델 결과는 콜백으로, 추천 결과는 작업 조회로 회수합니다.',
      sequence: ['보컬 녹음 제출', '음색 모델별 결과 저장', '프로필·선호로 추천 계산', '섹션별 추천곡 표시'],
      storage: 'BE가 모델 결과·프로필·추천을 MySQL에 저장합니다. 분석용 WAV는 AI 작업 공간에 잠시 보관하며 S3를 경유하지 않습니다.',
      nodes: {
        android: node('보컬 녹음과 결과 화면', '사용자가 부른 보컬과 선택한 곡·녹음 구간', ['AudioRecord로 보컬을 녹음하고 WAV로 준비', 'BE에 녹음·메타데이터를 제출하고 작업 상태 조회', '닮은 가수와 추천 섹션을 받아 화면에 표시'], 'WAV·곡/구간 정보 → BE / 분석·추천 화면 → 사용자', ['audio/PitchCapture.kt', 'ui/recommend/RecommendDeckScreen.kt']),
        backend: node('분석 접수 → 프로필 → 추천 연결', 'WAV·requestId, AI 컴포넌트 콜백, 저장된 음역·선호', ['소유권·WAV를 검증하고 같은 요청의 중복 접수를 구분', 'ECAPA·Singer-BYOL 결과와 모델 버전을 저장', '프로필·선호 스냅샷으로 추천 요청을 조립하고 결과 회수'], 'analysisId·진행 상태 / 프로필 / 추천 섹션과 곡별 결과', ['voice/service/DirectVoiceAnalysisService.java', 'voice/service/TimbreAnalysisLifecycleService.java', 'recommendation/service/RecommendationInputAssembler.java', 'recommendation/service/RecommendationPollingService.java']),
        ai: node('음색 임베딩 추출과 후보 재정렬', '보컬 WAV / 저장된 음색 벡터·음역·선호 정보', ['4초 창·2초 간격의 보컬 구간에서 두 모델 임베딩 추출', 'ECAPA 192차원·Singer-BYOL 1,000차원 결과를 각각 콜백', '카탈로그와 비교해 음색·음역·선호를 반영한 섹션별 후보 계산'], '모델별 벡터·품질 정보 / 추천곡·추천 키·섹션 결과', ['ai/recommend-server/analysis_jobs.py', 'timbre_recommender/embedding.py', 'timbre_recommender/shelves.py']),
        mysql: node('모델 결과와 추천 스냅샷 저장', 'BE가 검증한 모델별 벡터·버전, 프로필과 추천 결과', ['분석 세션과 모델별 상태·결과를 구분해 기록', '추천 생성에 사용한 프로필·선호 버전을 연결', '추천 섹션과 곡 순서를 저장해 재조회에 사용'], 'BE가 조회하는 음성 프로필·모델 결과·저장 추천', ['recommendation/service/RecommendationInputAssembler.java', 'recommendation/service/RecommendationResultStore.java']),
        s3: node('이 분석의 WAV 전달에는 미사용', '이 직접 분석 경로에서는 입력 없음', ['앱 → BE → AI로 WAV를 직접 전달', '분석 원음은 AI 작업 공간의 만료 정책으로 관리', 'S3 녹음 보관·카탈로그 미디어 경로와 구분'], '이 분석 경로의 직접 출력 없음', ['voice/service/DirectVoiceAnalysisService.java', 'ai/recommend-server/README.md']),
      },
    },
    range: {
      label: '음역 측정', active: ['android', 'backend', 'ai', 'mysql'],
      api: '측정 WAV + 메타데이터 / 음역 결과 조회', ai: 'RANGE 작업 요청 / 음별 측정 결과 콜백',
      text: '측정 중의 안내는 기기에서 처리하고, 완료한 WAV와 음별 메타데이터는 BE를 통해 RANGE 작업으로 검증합니다. 앱은 서버가 확정한 음역 결과를 조회해 리포트로 표시합니다.',
      sequence: ['기기에서 음정·유지 구간 측정', 'WAV·측정 메타데이터 제출', 'RANGE 작업으로 서버 검증', '확정된 음역 리포트 조회'],
      storage: 'BE가 측정 상태와 음별 결과를 관리합니다. RangeAnalysisController의 WAV 직접 전달 경로는 S3에 원음을 저장하지 않습니다.',
      nodes: {
        android: node('실시간 측정 안내와 입력 품질 검사', '마이크 PCM, 측정한 목표음·유지 구간', ['기기에서 음정을 추적하며 측정 진행과 소리 유지를 안내', '완료한 WAV와 측정 메타데이터의 입력 품질 검사', '같은 WAV·requestId로 제출하고 서버 결과를 주기적으로 조회'], 'WAV·음별 측정 메타데이터 / 서버 결과 기반 리포트', ['data/onboarding/BackendRangeAnalysisGateway.kt', 'range/RangeInputQuality.kt']),
        backend: node('음역 제출 검증과 작업 상태 관리', '음성 세션, WAV, requestId·measurementId·측정 메타데이터', ['세션 접근 권한과 음역 입력 계약을 검증', 'WAV 해시·requestId로 재전송을 구분하고 AI에 직접 전달', 'RANGE 결과 콜백을 반영해 앱의 결과 조회에 응답'], '접수 analysisId·상태 / 음별 결과·상하한·안정 음역', ['voice/api/RangeAnalysisController.java', 'voice/service/RangeAnalysisService.java', 'voice/api/VoiceAnalysisComponentCallbackController.java']),
        ai: node('RANGE 전용 작업으로 음역 검증', 'WAV와 측정 프로토콜·음별 메타데이터', ['음색 모델이 아닌 RANGE worker를 별도 프로세스로 실행', '녹음과 측정 정보를 분석해 음별 결과와 음역 계산', '완료·실패·입력 부족 상태를 BE에 콜백'], '음별 측정값·음역·발성 유지 정보와 처리 상태', ['ai/recommend-server/analysis_jobs.py', 'ai/vocal-scope/model-server/be_range_worker.py']),
        mysql: node('음역 측정 결과와 프로필 연결', 'BE가 수신한 측정 상태·음별 결과·음역 경계', ['분석 세션과 음역 측정 결과를 연결해 저장', '음색 모델 결과와 별도 상태로 관리', '저장 프로필과 이후 추천 입력에서 같은 음역 결과를 참조'], '세션별 측정 결과 / 추천에 사용되는 음역 프로필', ['domain/voice/entity/VoiceRangeMeasurement.java', 'recommendation/service/RecommendationInputAssembler.java']),
        s3: node('측정 WAV 저장에는 미사용', '음역 측정 WAV의 S3 입력 없음', ['BE가 받은 WAV를 AI gateway로 직접 전달', '음역 작업의 원음은 AI 임시 작업 공간에서 관리', '곡 반주·별도 녹음 보관과 혼동하지 않도록 분리'], '이 음역 측정 경로의 직접 출력 없음', ['voice/api/RangeAnalysisController.java', 'voice/service/RangeAnalysisService.java']),
      },
    },
    practice: {
      label: '노래 연습 · 실시간 경로', active: ['android', 'backend', 'mysql', 's3'],
      api: 'songId + selectedKey / 반주·가사·목표 음표', ai: '라이브 판정에는 호출하지 않음',
      text: '연습을 시작하기 전에 선택한 키의 자산을 받습니다. 부르는 동안에는 반주 시간과 마이크 음정을 Android 안에서 비교하며, 실시간 판정을 위해 AI 서버를 왕복하지 않습니다.',
      sequence: ['곡·키로 연습 자산 요청', '반주·목표 음표 준비', '기기에서 YIN 추적·실시간 판정', '연습 종료 후 결과 저장'],
      storage: 'MySQL은 곡·키별 자산 참조와 연습 이력을, S3는 실제 반주·미디어 파일을 담당합니다. BE가 선택 키의 접근 URL을 발급합니다.',
      nodes: {
        android: node('반주 동기화·음정 추적·라이브 판정', '선택 키의 반주·목표 음표·가사와 마이크 PCM', ['Media3의 반주 위치에 맞춰 목표 음표·가사 동기화', 'AudioRecord 프레임에 YIN을 적용해 실제 음높이 추정', 'LiveScorer로 목표음과 비교해 판정·점수·음정 궤적 표시'], '실시간 피드백 / 종료 후 연습 결과·녹음 저장 요청', ['audio/InstrumentalPlayer.kt', 'scoring/YinPitch.kt', 'scoring/LiveScorer.kt', 'ui/practice/PracticeScreen.kt']),
        backend: node('선택 키 자산 제공과 연습 기록 관리', 'songId·selectedKey / 연습 세션·완료 요청', ['−3~+3 키 범위와 요청 곡을 검증', '같은 키의 반주·목표 음정·가사와 예상 난관을 조회', '미디어 접근 URL을 발급하고 연습 세션·완료 결과 관리'], '반주 URL·목표 음표·가사·연습 구간 / 저장된 연습 이력', ['practice/api/PracticeAssetController.java', 'practice/service/PracticeAssetService.java', 'practice/api/PracticeController.java']),
        ai: node('실시간 연습 판정에는 미참여', '부르는 동안의 마이크 프레임을 받지 않음', ['라이브 음정 추정은 Android의 YIN이 수행', '라이브 판정은 Android의 LiveScorer가 수행', '음색·음역 분석 작업과 실시간 연습 경로를 분리'], '실시간 피드백에 대한 서버 출력 없음', ['scoring/YinPitch.kt', 'scoring/LiveScorer.kt', 'ui/practice/PracticeViewModel.kt']),
        mysql: node('곡·키별 자산 참조와 연습 이력', '곡 메타데이터·키별 미디어 참조 / BE의 연습 기록', ['선택한 곡과 키의 반주 자산 참조를 조회', '연습 세션과 완료 상태·결과를 기록', '연습 이력과 같은 곡의 점수 추이 조회에 사용'], 'BE가 반환하는 자산 참조·연습 이력·점수 추이', ['practice/service/PracticeAssetService.java', 'practice/api/PracticeController.java']),
        s3: node('선택 키의 실제 반주·미디어 제공', 'BE가 조회한 파일 경로와 만료 URL 요청', ['원키·키별 반주 등 미디어 파일을 저장', 'BE가 발급한 만료 접근 URL로 파일 제공', '미디어 파일 저장을 DB의 세션·점수 기록과 분리'], '앱이 재생하는 선택 키의 반주·미디어 바이트', ['practice/service/PracticeAssetService.java', 'docs/KEY_VARIANT_ROLLOUT.md', 'docs/operations/S3_VOICE_STORAGE.md']),
      },
    },
  };
  let currentFlow = 'timbre';
  let currentNode = 'android';
  function setNode(key) {
    currentNode = key;
    const flow = flows[currentFlow];
    const item = flow.nodes[key];
    map.querySelectorAll('[data-node]').forEach(card => {
      const selected = card.dataset.node === key;
      card.classList.toggle('is-selected', selected);
      card.querySelector('button').setAttribute('aria-pressed', String(selected));
    });
    detail.querySelector('.component-context').textContent = `${flow.label} / ${names[key]}`;
    detail.querySelector('h3').textContent = item.role;
    detail.querySelector('[data-detail="input"]').textContent = item.input;
    detail.querySelector('[data-detail="output"]').textContent = item.output;
    detail.querySelector('ol').replaceChildren(...item.steps.map(step => {
      const li = document.createElement('li'); li.textContent = step; return li;
    }));
    detail.querySelector('.component-evidence').replaceChildren(...item.source.map(path => {
      const code = document.createElement('code'); code.textContent = path; return code;
    }));
  }
  function setFlow(key) {
    currentFlow = key;
    const flow = flows[key];
    map.dataset.flow = key;
    map.querySelectorAll('[data-node]').forEach(card => {
      const item = flow.nodes[card.dataset.node];
      const active = flow.active.includes(card.dataset.node);
      card.classList.toggle('is-active', active);
      card.classList.toggle('is-dimmed', !active);
      card.querySelector('.node-label').textContent = active ? '이 경로에서 처리' : '이 경로에서는 미사용';
      card.querySelector('p').textContent = item.role;
      const list = card.querySelector('ul');
      if (list) list.replaceChildren(...item.steps.map(step => {
        const li = document.createElement('li'); li.textContent = step; return li;
      }));
    });
    map.querySelector('[data-edge="api"] span').textContent = flow.api;
    map.querySelector('[data-edge="ai"] span').textContent = flow.ai;
    map.querySelector('[data-edge="ai"]').classList.toggle('is-dimmed', key === 'practice');
    map.querySelector('.system-storage-link').textContent = flow.storage;
    document.querySelectorAll('button[data-flow]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.flow === key)));
    const explanation = document.querySelector('.flow-explanation');
    explanation.querySelector('span').textContent = flow.label;
    explanation.querySelector('p').textContent = flow.text;
    document.querySelector('.flow-steps').replaceChildren(...flow.sequence.map(step => {
      const li = document.createElement('li'); li.textContent = step; return li;
    }));
    setNode(currentNode);
  }
  map.querySelectorAll('[data-node]').forEach(card => {
    const button = document.createElement('button');
    button.className = 'component-select'; button.type = 'button';
    button.textContent = '처리 상세 보기 ＋';
    button.setAttribute('aria-label', `${names[card.dataset.node]} 처리 상세 보기`);
    button.setAttribute('aria-controls', 'component-detail');
    button.addEventListener('click', () => {
      setNode(card.dataset.node);
      detail.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    card.append(button);
  });
  document.querySelectorAll('button[data-flow]').forEach(button => button.addEventListener('click', () => setFlow(button.dataset.flow)));
  setFlow(currentFlow);
})();
