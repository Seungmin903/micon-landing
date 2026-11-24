'use strict';

(() => {
  if (document.body.dataset.page !== 'home') return;
  const redirects = {features:'demo.html',screens:'demo.html',technology:'technology.html',engineering:'technology.html',reliability:'development.html',validation:'development.html',team:'team.html'};
  const target = redirects[location.hash.slice(1)];
  if (target) location.replace(target + location.search + location.hash);
})();



const screens = {
  analysis: { file: '10_report_result.png', label: '목소리 분석 리포트 개발 화면', eyebrow: 'VOICE ANALYSIS', title: '내 목소리를<br>눈으로 이해하기.', description: '전체 음역, 편안한 음역과 음역별 안정성을 리포트로 확인하는 화면입니다.' },
  recommend: { file: '03_recommend.png', label: 'LP 레코드 형태의 추천곡 개발 화면', eyebrow: 'PERSONALIZED DISCOVERY', title: '다음 애창곡을<br>발견하는 즐거움.', description: 'LP 레코드 형태로 노래를 탐색하는 추천 화면입니다. 마음에 드는 곡에서 나와의 적합도 확인으로 이어집니다.' },
  match: { file: '17_song_match.png', label: '곡 음역 매칭 분석과 추천 키 개발 화면', eyebrow: 'FIND YOUR KEY', title: '부르기 전에,<br>나에게 맞는 키부터.', description: '내 음역과 곡의 음역을 비교하고, 권장 키와 부담이 될 수 있는 구간을 살펴보는 화면입니다.' },
  practice: { file: '14_practice.png', label: '키 조절과 가사가 표시된 노래 연습 개발 화면', eyebrow: 'PRACTICE & GROW', title: '좋아하는 노래를<br>나의 노래로.', description: '곡의 키를 조절하고 가사에 맞춰 연습하는 화면입니다. 현재 앱 코드는 목표 음정과 실시간 음정 비교도 지원합니다.' },
  favorites: { file: '09_favorites.png', label: '찜 목록과 세트리스트 개발 화면', eyebrow: 'YOUR OWN SETLIST', title: '부르고 싶은 노래,<br>잊지 않도록.', description: '마음에 드는 곡을 찜하고 나만의 세트리스트로 모으는 화면입니다. 다음에 부를 노래를 미리 준비하세요.' },
};

const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('#navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', '메뉴 열기');
  navigation.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
  navigation.classList.toggle('open', open);
});
navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });
window.matchMedia('(min-width: 801px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

if (document.querySelector('#explorer-image')) {
let selectedScreen = 'analysis';
const tabs = [...document.querySelectorAll('[data-screen]')];
const explorerImage = document.querySelector('#explorer-image');
const description = document.querySelector('.screen-description');
const panel = document.querySelector('#screen-panel');
function selectScreen(key, focus = false) {
  if (!screens[key]) return;
  selectedScreen = key;
  const screen = screens[key];
  tabs.forEach(tab => {
    const selected = tab.dataset.screen === key;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focus) tab.focus();
  });
  explorerImage.src = `assets/screens/${screen.file}`;
  explorerImage.alt = screen.label;
  panel.setAttribute('aria-labelledby', `tab-${key}`);
  description.querySelector('.small-label').textContent = screen.eyebrow;
  description.querySelector('h3').innerHTML = screen.title;
  description.querySelector('p').textContent = screen.description;
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectScreen(tab.dataset.screen));
  tab.addEventListener('keydown', event => {
    let next;
    if (['ArrowDown', 'ArrowRight'].includes(event.key)) next = (index + 1) % tabs.length;
    if (['ArrowUp', 'ArrowLeft'].includes(event.key)) next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectScreen(tabs[next].dataset.screen, true); }
  });
});
const dialog = document.querySelector('#screen-dialog');
const dialogImage = document.querySelector('#dialog-image');
function openScreen(key) {
  selectScreen(key);
  dialogImage.src = `assets/screens/${screens[key].file}`;
  dialogImage.alt = `${screens[key].label} 확대`;
  document.querySelector('#dialog-title').textContent = screens[key].label;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}
document.querySelector('#zoom-screen').addEventListener('click', () => openScreen(selectedScreen));
document.querySelectorAll('[data-open-screen]').forEach(button => button.addEventListener('click', () => openScreen(button.dataset.openScreen)));
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  const rect = dialog.getBoundingClientRect();
  if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
});
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

}

if ('IntersectionObserver' in window) {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reducedMotion) {
    document.body.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(element => revealObserver.observe(element));
  }
}
