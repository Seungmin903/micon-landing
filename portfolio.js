(() => {
  const map = document.querySelector('.system-map');
  const description = document.querySelector('.flow-explanation');
  const flows = {
    timbre: { label: '음색 분석·추천', nodes: ['android', 'backend', 'ai', 'mysql', 's3'], edges: ['api', 'ai'], text: 'Android에서 녹음을 제출하면 BE가 AI 작업을 접수합니다. AI의 컴포넌트별 결과를 콜백으로 받아 프로필과 추천 결과에 연결합니다.' },
    range: { label: '음역 측정', nodes: ['android', 'backend', 'ai', 'mysql', 's3'], edges: ['api', 'ai'], text: 'Android에서 음정과 유지 구간을 측정하고 입력 품질을 검사합니다. 완료한 WAV와 측정 메타데이터를 BE로 제출한 뒤 서버 분석 결과를 조회합니다. 실시간 안내와 최종 분석의 책임을 나눴습니다.' },
    practice: { label: '노래 연습 · 실시간 경로', nodes: ['android', 'backend', 'mysql', 's3'], edges: ['api'], text: 'BE가 선택한 키의 반주와 목표 음정 자산을 제공합니다. 반주 재생과 마이크 음정 추적·라이브 판정은 Android 안에서 처리하므로, 부르는 동안의 매 프레임을 AI 서버로 전송하지 않습니다.' },
  };
  function setFlow(key) {
    const flow = flows[key];
    map.dataset.flow = key;
    map.querySelectorAll('[data-node]').forEach(node => {
      const active = flow.nodes.includes(node.dataset.node);
      node.classList.toggle('is-active', active);
      node.classList.toggle('is-dimmed', !active);
    });
    map.querySelectorAll('[data-edge]').forEach(edge => edge.classList.toggle('is-dimmed', !flow.edges.includes(edge.dataset.edge)));
    document.querySelectorAll('[data-flow]').forEach(button => {
      if (button.tagName === 'BUTTON') button.setAttribute('aria-pressed', String(button.dataset.flow === key));
    });
    description.querySelector('span').textContent = flow.label;
    description.querySelector('p').textContent = flow.text;
  }
  document.querySelectorAll('button[data-flow]').forEach(button => button.addEventListener('click', () => setFlow(button.dataset.flow)));
  setFlow('timbre');

  const examples = {
    '0': { coverage: '71%', insight: '원키에서는 안정 음역을 벗어나는 구간이 있습니다.' },
    '-1': { coverage: '87%', insight: '한 반음 낮추면 안정 음역 안에 들어오는 구간이 늘어납니다.' },
    '-2': { coverage: '93%', insight: '두 반음 낮춘 예시에서는 안정 음역 일치율이 93%입니다.' },
    '-3': { coverage: '100%', insight: '발표 예시에서는 세 반음 낮췄을 때 안정 음역 안에 들어옵니다.' },
  };
  document.querySelectorAll('[data-key]').forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.key;
    const example = examples[key];
    document.querySelector('#key-label').textContent = key === '0' ? '원키' : `${key.replace('-', '−')} 반음`;
    document.querySelector('#key-coverage').textContent = example.coverage;
    document.querySelector('#key-insight').textContent = example.insight;
    document.querySelector('#key-song-line').style.transform = `translateY(${Math.abs(Number(key)) * 15}px)`;
    document.querySelectorAll('[data-key]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
  }));
})();
