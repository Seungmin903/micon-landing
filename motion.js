/* Current Android UI illustrations, with scroll-linked scene transitions. */
(() => {
  const story = document.querySelector('.service-motion');
  if (!story) return;

  const visual = story.querySelector('.story-visual');
  const chapters = [...story.querySelectorAll('[data-story]')];
  const scenes = [...story.querySelectorAll('[data-motion-scene]')];
  const buttons = [...story.querySelectorAll('[data-story-go]')];
  const toggle = document.querySelector('#motion-toggle');
  const status = story.querySelector('.motion-status');
  const mobile = window.matchMedia('(max-width: 600px)');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copy = {
    analysis: { caption: '목소리를 알아가는 순간', line: '목소리의 움직임이', strong: '나만의 지도가 되는 중.', symbol: '∿' },
    match: { caption: '나에게 맞는 키를 찾는 순간', line: '키를 바꾸면,', strong: '나와 곡의 거리도 달라져요.', symbol: '♯' },
    practice: { caption: '노래가 내 것이 되는 순간', line: '잘 맞은 음도, 놓친 음도', strong: '눈으로 보며 연습해요.', symbol: '♩' },
  };
  let current = 'analysis';
  let paused = reducedMotion.matches;
  let inView = false;
  let queued = false;
  story.classList.add('motion-enhanced');

  function updateControls() {
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? '시연 재생' : '시연 일시정지';
    status.textContent = paused ? '멈춘 화면 · 코드 기반 재현' : '현재 코드 기반 UI · 예시 데이터';
  }

  function syncPlayback() {
    scenes.forEach(scene => {
      const image = scene.querySelector('img');
      const shouldPlay = scene.dataset.motionScene === current && inView && !paused && !document.hidden;
      const next = shouldPlay ? image.dataset.animated : image.dataset.still;
      if (image.getAttribute('src') !== next) image.src = next;
    });
    updateControls();
  }

  function setScene(key) {
    if (!copy[key] || (current === key && story.dataset.ready)) return;
    current = key;
    story.dataset.scene = key;
    story.dataset.ready = 'true';
    chapters.forEach(chapter => chapter.classList.toggle('is-active', chapter.dataset.story === key));
    buttons.forEach(button => {
      const active = button.dataset.storyGo === key;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    scenes.forEach(scene => {
      const active = scene.dataset.motionScene === key;
      scene.classList.toggle('is-active', active);
      scene.setAttribute('aria-hidden', String(!active));
    });
    story.querySelector('.story-caption').textContent = copy[key].caption;
    const callout = story.querySelector('.story-callout');
    callout.querySelector('span').textContent = copy[key].symbol;
    const paragraph = callout.querySelector('p');
    paragraph.replaceChildren(document.createTextNode(copy[key].line), document.createElement('br'));
    const strong = document.createElement('strong');
    strong.textContent = copy[key].strong;
    paragraph.append(strong);
    syncPlayback();
  }

  function sceneFromScroll() {
    queued = false;
    if (mobile.matches) return;
    const bounds = story.getBoundingClientRect();
    if (bounds.top > window.innerHeight || bounds.bottom < 0) return;
    const center = window.innerHeight * .52;
    let nearest = chapters[0];
    let distance = Infinity;
    chapters.forEach(chapter => {
      const rect = chapter.getBoundingClientRect();
      const nextDistance = Math.abs(rect.top + rect.height / 2 - center);
      if (nextDistance < distance) { distance = nextDistance; nearest = chapter; }
    });
    setScene(nearest.dataset.story);
  }

  buttons.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.storyGo;
    setScene(key);
    if (!mobile.matches) {
      story.querySelector(`#story-${key}`).scrollIntoView({ block: 'center', behavior: 'instant' });
    }
  }));
  toggle.addEventListener('click', () => { paused = !paused; syncPlayback(); });
  window.addEventListener('scroll', () => {
    if (!queued) { queued = true; requestAnimationFrame(sceneFromScroll); }
  }, { passive: true });
  window.addEventListener('resize', sceneFromScroll);
  document.addEventListener('visibilitychange', syncPlayback);
  reducedMotion.addEventListener('change', event => { if (event.matches) paused = true; syncPlayback(); });

  if ('IntersectionObserver' in window) {
    new IntersectionObserver(entries => {
      inView = entries[0].isIntersecting;
      syncPlayback();
    }, { threshold: .15 }).observe(visual);
  } else {
    inView = true;
  }
  setScene('analysis');
  sceneFromScroll();
})();
