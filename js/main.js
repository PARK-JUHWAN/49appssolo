/* ============================================================
   main.js  — index.html 로직 (바닐라, 라이브러리 없음)
   · ?lang 없음 → 화면 A(언어 선택)
   · ?lang=xx  → 화면 B(랜딩), 해당 언어 데이터로 채움
   · 카드 클릭 → ?lang=xx 로 전환
   · 상단 언어버튼 → 화면 A 복귀
   · 풍선 → buy.html?lang=xx
   · 앱 마퀴 49개 (developer.html 의 App Store URL 이식)
   ============================================================ */

/* developer.html 에서 가져온 앱 49개 App Store URL (web_app_1 → [0] 순) */
const APP_URLS = [
  'https://apps.apple.com/kr/app/%EC%95%BC%EA%B0%84%EA%B7%BC%EB%AC%B4-%EC%8B%9D%EC%82%AC-%ED%83%80%EC%9D%B4%EB%A8%B8-%EA%B5%90%EB%8C%80%EA%B7%BC%EB%AC%B4/id6760750439',
  'https://apps.apple.com/kr/app/%EC%8B%A0%EC%83%9D%EC%95%84-%EB%B0%A4%EC%88%98%EC%9C%A0-%EA%B5%90%EB%8C%80-%EC%9C%A1%EC%95%84-%EC%88%98%EB%A9%B4/id6760886190',
  'https://apps.apple.com/kr/app/%EA%B5%90%EB%8C%80%EA%B7%BC%EB%AC%B4-%EC%9A%B4%EB%8F%99-%EC%95%BC%EA%B0%84-%ED%99%88%ED%8A%B8-%ED%83%80%EC%9D%B4%EB%B0%8D/id6760991758',
  'https://apps.apple.com/kr/app/cpap-comply-insurance-tracker/id6761286767',
  'https://apps.apple.com/kr/app/curlcast-hair-weather-guide/id6761350441',
  'https://apps.apple.com/kr/app/coralcalc-reef-dosing-guide/id6761398297',
  'https://apps.apple.com/kr/app/curdclock-cheese-making-timer/id6761403640',
  'https://apps.apple.com/kr/app/fertflow-planted-tank-dosing/id6761510216',
  'https://apps.apple.com/kr/app/dyebatch-dye-recipe-calculator/id6761513317',
  'https://apps.apple.com/kr/app/gluecast-lash-humidity-guide/id6761650405',
  'https://apps.apple.com/kr/app/spoolcast-filament-dry-guide/id6761673158',
  'https://apps.apple.com/kr/app/pourcast-resin-cure-guide/id6761698552',
  'https://apps.apple.com/kr/app/burrcast-espresso-grind-guide/id6761698525',
  'https://apps.apple.com/kr/app/spritzcast-scent-spray-guide/id6761741710',
  'https://apps.apple.com/kr/app/meltcast-makeup-weather-guide/id6761742028',
  'https://apps.apple.com/kr/app/nailcast-nail-cure-guide/id6761795705',
  'https://apps.apple.com/kr/app/dewskin-skin-weather-guide/id6761796896',
  'https://apps.apple.com/kr/app/vocalcast-voice-weather-guide/id6761872859',
  'https://apps.apple.com/kr/app/lenscast-contact-lens-weather/id6761886816',
  'https://apps.apple.com/kr/app/beardcast-beard-weather-guide/id6761962144',
  'https://apps.apple.com/kr/app/inkcast-tattoo-uv-fade-guide/id6761962130',
  'https://apps.apple.com/kr/app/dyecast-hair-color-fade-guide/id6761962395',
  'https://apps.apple.com/kr/app/fretcast-guitar-humidity-care/id6762030585',
  'https://apps.apple.com/kr/app/weathercar-wash-shine-guide/id6762030348',
  'https://apps.apple.com/kr/app/shrimpcalc-mineral-water-guide/id6762030923',
  'https://apps.apple.com/kr/app/clayweather-pottery-dry-guide/id6762031080',
  'https://apps.apple.com/kr/app/bbqcast-pit-weather-guide/id6762104076',
  'https://apps.apple.com/kr/app/haircast-flat-iron-weather/id6762104305',
  'https://apps.apple.com/kr/app/sinkercalc-fish-weight-guide/id6762243481',
  'https://apps.apple.com/kr/app/tanready-self-tan-timer/id6762243927',
  'https://apps.apple.com/kr/app/sunrig-rv-solar-power-guide/id6762322766',
  'https://apps.apple.com/kr/app/spraybench-model-paint-guide/id6762324971',
  'https://apps.apple.com/kr/app/nibflow/id6762325529',
  'https://apps.apple.com/kr/app/flyway-bird-forecast/id6762440479',
  'https://apps.apple.com/kr/app/humidbake/id6762443375',
  'https://apps.apple.com/kr/app/henwise/id6762583691',
  'https://apps.apple.com/kr/app/milespan/id6762584185',
  'https://apps.apple.com/kr/app/candlewise-pour-weather-guide/id6762701740',
  'https://apps.apple.com/kr/app/digday-metal-detecting-score/id6762703040',
  'https://apps.apple.com/kr/app/staintime-finish-poly-timer/id6762704012',
  'https://apps.apple.com/kr/app/sendtemps-climbing-friction/id6762705336',
  'https://apps.apple.com/kr/app/rigdial-fly-leader-builder/id6762942016',
  'https://apps.apple.com/kr/app/fadeguard-sneaker-sole-care/id6762944366',
  'https://apps.apple.com/kr/app/knithour-blocking-guide/id6762943687',
  'https://apps.apple.com/kr/app/roastweather/id6762942702',
  'https://apps.apple.com/kr/app/%EA%B0%84%ED%98%B8%EC%82%AC-%EA%B7%BC%EB%AC%B4%ED%91%9C-%ED%8F%AC%EC%98%A4%ED%94%84/id6756883621',
  'https://apps.apple.com/kr/app/%ED%8C%8C%EC%B6%A9%EB%A5%98-%EC%82%AC%EC%9C%A1-%ED%85%8C%EB%9D%BC%EB%A6%AC%EC%9B%80-%EC%98%A8%EC%8A%B5%EB%8F%84/id6766152966',
  'https://apps.apple.com/kr/app/%EC%8B%9D%EC%B6%A9%EC%8B%9D%EB%AC%BC-%ED%8C%8C%EB%A6%AC%EC%A7%80%EC%98%A5-%EB%84%A4%ED%8E%9C%EB%8D%B0%EC%8A%A4-%ED%9C%B4%EB%A9%B4/id6766277179',
  'https://apps.apple.com/kr/app/%EB%A7%90-%EC%A0%9C%EC%97%BD%EC%97%BC-%EB%B0%A9%EB%AA%A9-%ED%92%80-%EC%82%AC%EB%A3%8C-%EA%B4%80%EB%A6%AC/id6767417726'
];

const byId = (id) => document.getElementById(id);
const getLang = (code) => LANGS.find(l => l.id === code);
function param(name){ return new URLSearchParams(location.search).get(name); }

/* ---------- 화면 A : 언어 그리드 ---------- */
function buildSelect(){
  const grid = byId('selGrid');
  grid.innerHTML = '';
  LANGS.filter(l => l.ready).forEach(l => {
    const card = document.createElement('a');
    card.className = 'lang-card';
    card.href = '?lang=' + l.id;
    card.innerHTML = '<div class="nat">' + l.native + '</div><div class="lab">' + l.label + '</div>';
    card.addEventListener('click', (e) => {
      e.preventDefault();
      go(l.id);
    });
    grid.appendChild(card);
  });
}

/* ---------- 마퀴 ---------- */
function tile(idx){
  const a = document.createElement('a');
  a.href = APP_URLS[idx-1] || '#';
  a.target = '_blank'; a.rel = 'noopener';
  a.className = 'app-tile';
  a.innerHTML = '<img src="images/app/web_app_' + idx + '.png" alt="App ' + idx + '">';
  return a;
}
function fillRow(rowId, start, end){
  const el = byId(rowId); if(!el || el.childElementCount) return;
  for(let pass=0; pass<2; pass++){          // 무한 루프 위해 2회 복제
    for(let i=start; i<=end; i++) el.appendChild(tile(i));
  }
}
/* 마퀴 애니메이션 재시작 — 모바일 첫 진입 시 이미지 로딩 reflow로 멈추는 버그 방지.
   타일을 다 넣은 뒤, 이미지가 로드되면 애니메이션을 깨끗한 좌표로 다시 건다. */
function restartMarquee(){
  ['row1','row2','row3','row4'].forEach(id => {
    const el = byId(id); if(!el) return;
    el.style.animation = 'none';
    void el.offsetWidth;          // reflow 강제 → 애니메이션 리셋
    el.style.animation = '';       // CSS 정의값으로 복귀 (재시작)
  });
}
function buildMarquee(){
  fillRow('row1',1,12); fillRow('row2',13,24); fillRow('row3',25,36); fillRow('row4',37,49);
  // 모든 마퀴 이미지가 로드된 뒤 한 번 재시작 (이미 캐시면 즉시)
  const imgs = Array.from(document.querySelectorAll('.apps-marquee img'));
  let pending = imgs.filter(im => !im.complete).length;
  if(pending === 0){ requestAnimationFrame(restartMarquee); }
  else {
    imgs.forEach(im => {
      if(im.complete) return;
      const done = () => { pending--; if(pending===0) requestAnimationFrame(restartMarquee); };
      im.addEventListener('load', done, {once:true});
      im.addEventListener('error', done, {once:true});
    });
  }
}

/* ---------- 화면 B : 랜딩 채우기 ---------- */
function buildLanding(l){
  byId('heroTitle').textContent = l.title;
  byId('heroSub').textContent   = l.sub;
  byId('proof').textContent     = l.proof;
  byId('cap1').textContent      = l.cap1;
  byId('cap2').textContent      = l.cap2;
  byId('ytCap').textContent     = l.ytLabel;
  byId('switchLabel').textContent = l.native;
  const bln = byId('balloon');
  bln.textContent = l.buyLabel;
  bln.href = 'buy.html?lang=' + l.id;
  buildMarquee();

  // RTL
  const land = byId('landing');
  if(l.dir === 'rtl'){ land.classList.add('rtl'); document.documentElement.setAttribute('dir','rtl'); }
  else { land.classList.remove('rtl'); document.documentElement.removeAttribute('dir'); }
  document.documentElement.lang = l.id;
}

/* ---------- 라우팅 ---------- */
function showSelect(){
  byId('landing').classList.remove('show');
  const sel = byId('select');
  sel.classList.remove('hide');
  requestAnimationFrame(() => sel.classList.add('show'));
  document.documentElement.removeAttribute('dir');
}
function showLanding(l){
  buildLanding(l);
  const sel = byId('select');
  sel.classList.remove('show'); sel.classList.add('hide');
  const land = byId('landing');
  requestAnimationFrame(() => {
    land.classList.add('show');
    byId('topbar').classList.add('show');
    byId('balloon').classList.add('show');
    revealInit();
  });
  window.scrollTo(0,0);
}

/* 카드 클릭 → URL 갱신 + 랜딩 (히스토리에 쌓아 뒤로가기 = 선택화면) */
function go(code){
  history.pushState({lang:code}, '', '?lang=' + code);
  route();
}

function route(){
  const code = param('lang');
  const l = code && getLang(code);
  if(l && l.ready){ showLanding(l); }
  else { showSelect(); }
}

/* ---------- 스크롤 페이드인 ---------- */
let io;
function revealInit(){
  if(io) io.disconnect();
  io = new IntersectionObserver((entries) => {
    entries.forEach(en => { if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target);} });
  }, {threshold:0.12});
  document.querySelectorAll('#landing .reveal').forEach(el => { el.classList.remove('in'); io.observe(el); });
}

/* ---------- init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  buildSelect();
  byId('langSwitch').addEventListener('click', () => { history.pushState({}, '', location.pathname); route(); });
  window.addEventListener('popstate', route);
  route();
});
