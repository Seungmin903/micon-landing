"""Code-based web illustrations. See docs/SERVICE_UI_SOURCES.md; not app captures."""
from pathlib import Path
from html import escape
import base64

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets/screens'
LOGO = base64.b64encode((ROOT / 'assets/logo-ppt.png').read_bytes()).decode()
INK, GREY, PURPLE = '#1E1B33', '#6B6B78', '#6C5CE7'

def text(x, y, value, size=13, color=INK, weight=400, anchor='start', cls=''):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" font-weight="{weight}" text-anchor="{anchor}" class="{cls}">{escape(str(value))}</text>'

def rect(x, y, w, h, fill='white', r=20, extra=''):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{r}" fill="{fill}" {extra}/>'

def card(y, h):
    return rect(20, y, 320, h, extra='stroke="#E4E2EE" stroke-width=".6"')

def disc(x, y, radius=28, title=''):
    return f'<g transform="translate({x} {y})"><circle r="{radius}" fill="url(#disc)"/><path d="M{-radius*.7} {-radius*.7}L{radius*.7} {radius*.7}" stroke="white" stroke-opacity=".5" stroke-width="{radius*.2}"/><circle r="{radius*.28}" fill="url(#hub)"/><circle r="{radius*.12}" fill="#F7F5FC"/>{text(0,-radius*.45,title, max(8,radius*.17),anchor="middle") if title else ""}</g>'

def header(back=False):
    if back:
        return text(22,40,'‹',32)+text(330,38,'♡',25,anchor='end')
    return f'<image x="20" y="22" width="88" height="23" href="data:image/png;base64,{LOGO}"/>'+text(330,40,'⚙',24,anchor='end')

def nav(active):
    s=rect(14,692,332,68,r=34,extra='filter="url(#shadow)"')
    for i,(label,icon) in enumerate([('분석','≋'),('추천','◎'),('연습','♩'),('기록','◷'),('찜','♡')]):
        x=47+i*66.4
        if i==active: s+=f'<circle cx="{x}" cy="726" r="26" fill="url(#nav)"/>'
        c='white' if i==active else GREY
        s+=text(x,725,icon,22,c,anchor='middle')+text(x,744,label,10,c,anchor='middle')
    return s

DEFS='''<defs><linearGradient id="disc"><stop stop-color="#DCD6FF"/><stop offset=".5" stop-color="#F3E8FF"/><stop offset="1" stop-color="#CFE6FF"/></linearGradient><linearGradient id="hub"><stop stop-color="#FFD6E0"/><stop offset=".3" stop-color="#E6F5C9"/><stop offset=".7" stop-color="#CFE0FA"/><stop offset="1" stop-color="#E2D4FB"/></linearGradient><linearGradient id="nav"><stop stop-color="#8358F2"/><stop offset="1" stop-color="#5B8DF3"/></linearGradient><filter id="shadow" x="-30%" y="-50%" width="160%" height="200%"><feDropShadow dy="5" stdDeviation="7" flood-color="#4C40A0" flood-opacity=".15"/></filter></defs>'''

def save(name, title, body, active=None):
    if active is not None: body+=nav(active)
    body+=text(180,779,'Android 코드 기반 재현 · 예시 데이터',9,GREY,anchor='middle')
    for animated in [False,True]:
        # Animated presentation variants only; ordinary explorer is static.
        style='''<style>.trace {stroke-dasharray:600;stroke-dashoffset:0;animation:draw 4s linear infinite}.pulse{animation:pulse 2s ease-in-out infinite}@keyframes draw{0%{stroke-dashoffset:600}70%,100%{stroke-dashoffset:0}}@keyframes pulse{50%{opacity:.45}}@media(prefers-reduced-motion:reduce){*{animation:none!important}}</style>''' if animated else ''
        svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="360" height="780" viewBox="0 0 360 780"><title>{escape(title)} · 코드 기반 재현</title>{DEFS}{style}<rect width="360" height="780" fill="#F7F5FC"/><g font-family="Pretendard,Malgun Gothic,sans-serif">{body}</g></svg>'
        (OUT/(name+('-motion' if animated else '')+'.svg')).write_text(svg,encoding='utf-8')

def analysis():
    s=header()+card(66,150)+text(36,94,'나와 닮은 가수',18,weight=700)
    for i,name in enumerate(['김민석','폴킴','정승환']):
        y=125+i*34
        s+=text(36,y,i+1,13,PURPLE,700)+f'<circle cx="72" cy="{y-5}" r="14" fill="#EEEBFF"/>'+text(72,y,name[0],12,PURPLE,anchor='middle')+text(98,y,name,14)
    s+=card(232,320)
    for x,y,name in [(180,292,'김민석'),(91,443,'폴킴'),(273,437,'정승환')]:
        s+=f'<path d="M180 392L{x} {y}" stroke="#E4E2EE" stroke-width="2" class="trace"/><circle cx="{x}" cy="{y}" r="28" fill="#EEEBFF" stroke="{PURPLE}"/>'+text(x,y+4,name,12,PURPLE,anchor='middle')
    s+=f'<circle cx="180" cy="392" r="32" fill="{PURPLE}"/>'+text(180,398,'나',15,'white',700,'middle')
    s+=card(568,100)+text(36,596,'이번에 확인한 음역',17,weight=700)+text(36,619,'기본 탐색 완료 · 추가 확인 완료 · 측정한 음 25개',10,GREY)+text(36,650,'3C(도) ~ 5C(도)',24,PURPLE,650)
    save('analysis-current','목소리 분석 리포트',s,0)

def match():
    s=header(True)+disc(66,104,40,'비밀의 화원')+text(123,97,'비밀의 화원',20,weight=700)+text(123,122,'아이유 · 예시 곡',13,GREY)
    s+=card(167,192)+text(36,198,'음역 매치',13,'#5546C9',600)+text(320,210,'92%',34,'#5546C9',800,'end')
    s+=rect(40,239,276,8,'#F1EFF8',4)+rect(72,239,213,8,PURPLE,4)+rect(102,232,173,22,'none',8,'stroke="#C92A5E" stroke-width="1.5"')
    s+=rect(37,280,14,6,PURPLE,3)+text(58,287,'내 음역',12,GREY)+rect(130,276,14,10,'none',5,'stroke="#C92A5E"')+text(151,287,'곡 음역',12,GREY)
    s+=text(36,323,'내 음역 안에서 부를 수 있어요.',13,GREY)
    s+=card(375,129)+text(36,404,'키 조절',13,'#5546C9',600)+text(61,459,'−',27,PURPLE)+text(180,452,'0',30,weight=700,anchor='middle')+text(180,478,'원키',12,GREY,anchor='middle')+text(300,459,'+',27,PURPLE)
    s+=card(520,135)+text(36,549,'어려운 구간',13,'#5546C9',600)+text(36,582,'후렴',14)+text(320,582,'01:45 부근',12,GREY,anchor='end')+text(36,620,'고음 집중 구간',13,GREY)
    s+=rect(20,694,320,52,PURPLE,26)+text(180,726,'원키로 연습하기',15,'white',650,'middle')
    save('match-current','곡 상세와 키 조절',s)

def practice():
    s=header(True)+text(180,38,'비밀의 화원 · 아이유',15,weight=650,anchor='middle')
    s+=text(20,80,'0:48',11,GREY)+rect(59,72,235,4,'#E4E2EE',2)+rect(59,72,60,4,PURPLE,2)+text(340,80,'3:59',11,GREY,anchor='end')
    s+=text(125,116,'−',22,PURPLE)+text(180,113,'원키',13,weight=600,anchor='middle')+text(235,116,'+',22,PURPLE)
    s+=rect(0,136,360,82,'#F4F2FC',0)+text(32,158,'score',12,GREY)+text(32,202,'86',44,weight=900)+text(178,165,'Perfect',14,'#0F9B6C',700,'middle')+rect(131,178,108,25,PURPLE,13)+text(185,195,'간주 건너뛰기',11,'white',anchor='middle')+rect(286,160,40,24,'#DCD6FF',12)+f'<circle cx="312" cy="172" r="8" fill="{PURPLE}"/>'
    s+=rect(0,230,360,168,'#F1EFF8',0)
    for y in range(246,397,28):s+=f'<path d="M0 {y}H360" stroke="#E4E2EE"/>'
    for x,y,w in [(20,330,46),(72,302,58),(140,274,43),(190,302,64),(264,274,57)]:s+=rect(x,y,w,9,'#8E7BFF',4)
    s+='<path class="trace" d="M0 340L24 336L50 332L75 310L100 305L130 306L146 279L175 281L192 310L225 306L257 303L278 280L310 278L360 281" fill="none" stroke="#0E9C80" stroke-width="2.5"/>'
    s+=text(180,449,'가사와 함께 연습해요',12,GREY,anchor='middle')+rect(24,475,312,66,'#EEEBFF',16)+text(180,515,'목표 음정을 따라 불러 보세요',17,PURPLE,700,'middle','pulse')+text(180,577,'실시간으로 내 음정을 확인해요',14,GREY,anchor='middle')
    s+=rect(0,632,360,148,'white',28)+text(76,695,'↶',28,GREY,anchor='middle')+text(76,720,'되돌리기',11,GREY,anchor='middle')+f'<circle cx="180" cy="689" r="34" fill="{PURPLE}"/>'+text(180,700,'Ⅱ',30,'white',700,'middle')+text(284,695,'×',28,GREY,anchor='middle')+text(284,720,'마치기',11,GREY,anchor='middle')
    save('practice-current','실시간 음정과 가사 연습',s)

def favorites():
    s=header()+rect(20,66,320,48,'white',16)+text(36,96,'⌕',22,GREY)+text(65,95,'노래나 가수를 검색해 보세요',13,GREY)
    s+=rect(20,130,158,48,'#EEEBFF',16)+text(99,159,'찜',16,PURPLE,700,'middle')+text(258,159,'세트리스트',16,GREY,anchor='middle')
    for i,(title,artist) in enumerate([('비밀의 화원','아이유'),('사랑 부르기','장나라'),('To Heaven','조성모'),('시간을 거슬러','린'),('사랑했지만','김광석')]):
        y=222+i*85;s+=disc(48,y,28)+text(92,y-2,title,15,weight=600)+text(92,y+21,artist,12,GREY)+text(322,y+6,'♥',24,PURPLE,anchor='end')
        s+=f'<path d="M20 {y+43}H340" stroke="#E4E2EE" stroke-width=".6"/>'
    save('favorites-current','찜과 세트리스트',s,4)

analysis();match();practice();favorites()
# Keep the recommendation illustration consistent with the current floating navbar.
p=OUT/'recommend-deck.svg';s=p.read_text(encoding='utf-8');a=s.find('<g id="current-nav">');
if a>=0:s=s[:a]+s[s.index('</g><!-- current-nav -->',a)+len('</g><!-- current-nav -->'):]
s=s.replace('</svg>','<g id="current-nav">'+'<defs><linearGradient id="nav"><stop stop-color="#8358F2"/><stop offset="1" stop-color="#5B8DF3"/></linearGradient></defs>'+nav(1)+'</g><!-- current-nav --></svg>');p.write_text(s,encoding='utf-8')
