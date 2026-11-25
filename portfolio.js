(() => {
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
