(() => {
  const title = document.querySelector('.brand-title');
  const replay = document.querySelector('.brand-replay');
  if (!title || !replay) return;
  replay.addEventListener('click', () => {
    title.classList.remove('is-lit');
    requestAnimationFrame(() => requestAnimationFrame(() => title.classList.add('is-lit')));
  });
})();
