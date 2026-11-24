const translations = {
 en: {
  work:"Films",studio:"Studio",contact:"Contact",language:"Language",watch:"Our films",selected:"Our films",viewFilm:"Play film",prev:"Previous film",next:"Next film",home:"Back to home",
  scope:"Film production for real estate, architecture & construction.",perdiz:"Architectural concept film",villa:"Villa film",fpv:"FPV walkthrough",development:"Development film",tour:"Guided villa tour",
  studioTitle:"A film for every stage of the build.",about:"Based in Marbella, we organise film production for developers and builders. We plan the shoot around your project, from progress on site to the light in a finished room.",
  s1:"Development & launch films",s2:"Construction progress",s3:"Architecture & interiors",contactTitle:"Tell us about your project.",
  copy:"Copy email",copied:"Email copied",copyFallback:"Select the email address to copy it.",credits:"Film credits",creditText:"The La Concha landscape adapts a photograph by Hernán Piñera.",close:"Close",pause:"Pause background film",play:"Play background film",
  perdizNote:"Benahavís · A studio concept for a fictional hillside residence."
 },
 es: {
  work:"Películas",studio:"Estudio",contact:"Contacto",language:"Idioma",watch:"Nuestras películas",selected:"Nuestras películas",viewFilm:"Ver película",prev:"Película anterior",next:"Película siguiente",home:"Volver al inicio",
  scope:"Producción audiovisual para el sector inmobiliario, la arquitectura y la construcción.",perdiz:"Concepto audiovisual de arquitectura",villa:"Película de villa",fpv:"Recorrido FPV",development:"Película de promoción inmobiliaria",tour:"Visita guiada de la villa",
  studioTitle:"Una película para cada fase de la obra.",about:"Desde Marbella organizamos producciones audiovisuales para promotoras y constructoras. Planificamos cada rodaje en torno al proyecto, desde el avance de la obra hasta la luz de una estancia terminada.",
  s1:"Promociones y lanzamientos",s2:"Seguimiento de obra",s3:"Arquitectura e interiores",contactTitle:"Cuéntanos tu proyecto.",
  copy:"Copiar correo",copied:"Correo copiado",copyFallback:"Selecciona la dirección para copiarla.",credits:"Créditos",creditText:"El paisaje de La Concha es una adaptación de una fotografía de Hernán Piñera.",close:"Cerrar",pause:"Pausar vídeo de fondo",play:"Reproducir vídeo de fondo",
  perdizNote:"Benahavís · Concepto del estudio para una residencia ficticia en la ladera."
 },
 ru: {
  work:"Фильмы",studio:"Студия",contact:"Контакт",language:"Язык",watch:"Наши фильмы",selected:"Наши фильмы",viewFilm:"Смотреть фильм",prev:"Предыдущий фильм",next:"Следующий фильм",home:"На главную",
  scope:"Продакшен для недвижимости, архитектуры и строительства.",perdiz:"Архитектурный концепт",villa:"Фильм о вилле",fpv:"FPV-пролёт",development:"Фильм о девелоперском проекте",tour:"Обзор виллы с ведущим",
  studioTitle:"Фильм для каждого этапа стройки.",about:"Мы работаем в Марбелье и организуем съёмки для девелоперов и строительных компаний. Продумываем фильм под ваш объект — от первых работ на площадке до того, как свет ложится в готовом интерьере.",
  s1:"Фильмы к старту продаж",s2:"Ход строительства",s3:"Архитектура и интерьеры",contactTitle:"Расскажите о вашем проекте.",
  copy:"Скопировать почту",copied:"Адрес скопирован",copyFallback:"Выделите адрес, чтобы его скопировать.",credits:"О материалах",creditText:"Пейзаж Ла-Конча создан на основе фотографии Эрнана Пиньеры.",close:"Закрыть",pause:"Остановить фоновый фильм",play:"Включить фоновый фильм",
  perdizNote:"Бенаавис · Концепт студии для вымышленной резиденции на склоне."
 }
};
const byId=id=>document.getElementById(id);
const background=byId("intro"), motion=byId("motion"), cinema=byId("cinema"), credits=byId("credit-dialog"), player=byId("player");
const films = [
 {key:"webster", title:"Webster & Co", kind:"villa", time:"00:30", place:"Puente Romano", poster:"films/webster-mountain.jpg"},
 {key:"fpv-villa", title:"FPV Villa 2", kind:"fpv", time:"01:17"},
 {key:"villa-alfa-hd", title:"Villa Alfa", kind:"villa", time:"03:00"},
 {key:"madronal", title:"Madroñal", kind:"development", time:"00:45", portrait:true},
 {key:"alfa-edit", title:"Villa Alfa · Edit", kind:"villa", time:"00:29", portrait:true},
 {key:"cin-lento", title:"Cin Lento", kind:"villa", time:"00:58", portrait:true},
 {key:"hd-villa", title:"HD Villa", kind:"villa", time:"00:54", poster:"films/hd-villa-mountain.jpg"},
 {key:"villa-alfa-2", title:"Villa Alfa 2", kind:"tour", time:"00:38", portrait:true},
 {key:"perdiz", title:"La Perdiz", kind:"perdiz", time:"00:30", file:"la-perdiz.mp4", poster:"interior.jpg", place:"Benahavís", note:"perdizNote"}
];
const cardTemplate=byId("film-card-template");
films.forEach((film,index)=>{
 const card=cardTemplate.content.firstElementChild.cloneNode(true);
 const button=card.querySelector("button"), title=card.querySelector("h3");
 card.hidden=index!==0;card.inert=card.hidden;card.dataset.key=film.key;
 title.id="title-"+film.key; title.textContent=film.title;
 button.dataset.film=film.key;button.setAttribute("aria-labelledby",title.id);
 const poster="assets/"+(film.poster||"films/"+film.key+".jpg");
 card.querySelector("source").srcset=poster;
 card.querySelector("img").src=film.portrait?"assets/films/"+film.key+"-cover.jpg":poster;
 card.querySelector(".runtime").textContent=film.time;
 card.querySelector("p").dataset.t=film.kind;
 card.querySelector(".place").textContent=film.place||"";
 cardTemplate.before(card);
});
function addGlassRim(surface){
 const ns="http://www.w3.org/2000/svg";
 const rim=document.createElementNS(ns,"svg");
 rim.setAttribute("aria-hidden","true");
 rim.setAttribute("class","glass-rim");
 for(const layer of ["bloom","trail","glint"]){
  const edge=document.createElementNS(ns,"rect");
  edge.setAttribute("class",layer);
  edge.setAttribute("pathLength","100");
  rim.append(edge);
 }
 surface.append(rim);
}
document.querySelectorAll(".header nav,.watch,.film-card,.info-sheet,.contact-sheet").forEach(addGlassRim);
byId("position").textContent="01 / "+String(films.length).padStart(2,"0");
let language="en", activeFilm, inHero=true, wantsMotion=!matchMedia("(prefers-reduced-motion: reduce)").matches;
try{const saved=localStorage.getItem("1media-language");if(translations[saved])language=saved}catch{}
function syncControl(){
 const key=wantsMotion?"pause":"play";
 motion.dataset.paused=String(!wantsMotion);
 byId("motion-label").textContent=translations[language][key];
 motion.title=translations[language][key];
}
function updateLanguage(value){
 language=value; document.documentElement.lang=value; byId("lang").value=value;
 const words=translations[value];
 document.querySelectorAll("[data-t]").forEach(el=>{el.textContent=words[el.dataset.t]});
 document.querySelectorAll("[data-close]").forEach(el=>el.setAttribute("aria-label",words.close));
 if(activeFilm)byId("film-description").textContent=words[activeFilm.note||activeFilm.kind];
 byId("prev").setAttribute("aria-label",words.prev);
 byId("next").setAttribute("aria-label",words.next);
 document.querySelectorAll("[data-home]").forEach(el=>el.setAttribute("aria-label",words.home));
 byId("copy-status").textContent="";syncControl();
}
function syncBackground(){
 if(!wantsMotion||document.hidden||!inHero||cinema.open||credits.open){background.pause();return}
 background.play().catch(err=>{if(err.name==="AbortError")return;wantsMotion=false;syncControl()});
}
motion.addEventListener("click",()=>{wantsMotion=!wantsMotion;syncControl();syncBackground()});
document.addEventListener("visibilitychange",syncBackground);

byId("lang").addEventListener("change",event=>{updateLanguage(event.target.value);try{localStorage.setItem("1media-language",language)}catch{}});
// The native player handles HLS on Safari. Other browsers load the decoder
// when the gallery is opened, keeping it off the homepage's critical path.
const nativeHls=Boolean(player.canPlayType("application/vnd.apple.mpegurl"));
let decoderPromise, stream;
function loadDecoder(){
 if(nativeHls||!window.MediaSource)return Promise.resolve(null);
 if(!decoderPromise)decoderPromise=new Promise(resolve=>{
  const script=document.createElement("script");
  script.src="assets/vendor/hls-1.7.4.light.min.js";
  script.onload=()=>resolve(window.Hls?.isSupported()?window.Hls:null);
  script.onerror=()=>{decoderPromise=null;resolve(null)};
  document.head.append(script);
 });
 return decoderPromise;
}
function stopStream(){
 stream?.destroy();
 stream=null;
 player.onerror=null;
}
async function startFilm(film){
 const filename=film.file||film.key+".mp4";
 const manifest="assets/stream/"+filename.slice(0,-4)+"/master.m3u8";
 const direct="assets/fallback/"+filename;
 const isCurrent=()=>activeFilm===film&&cinema.open;
 function play(){player.play().catch(()=>{})}
 function fallback(){
  if(!isCurrent())return;
  const time=player.currentTime;
  stopStream();
  player.src=direct;
  if(time>0)player.currentTime=time;
  play();
 }
 if(nativeHls){
  player.onerror=fallback;
  player.src=manifest;
  play();
  return;
 }
 const Hls=await loadDecoder();
 if(!isCurrent())return;
 if(!Hls){fallback();return}
 const hls=new Hls({startLevel:0,capLevelToPlayerSize:true,maxBufferLength:18});
 stream=hls;
 hls.on(Hls.Events.ERROR,(_event,data)=>{if(stream===hls&&data.fatal)fallback()});
 hls.loadSource(manifest);
 hls.attachMedia(player);
 play();
}
function openFilm(key){
 const film=films.find(item=>item.key===key);activeFilm=film;
 byId("film-name").textContent=film.title;byId("film-description").textContent=translations[language][film.note||film.kind];
 cinema.classList.toggle("portrait-film",Boolean(film.portrait));
 player.poster="assets/"+(film.poster||"films/"+key+".jpg");
 cinema.showModal();syncBackground();startFilm(film);
}
document.querySelectorAll("[data-film]").forEach(el=>el.addEventListener("click",()=>openFilm(el.dataset.film)));
byId("credits").addEventListener("click",()=>{credits.showModal();syncBackground()});
[cinema,credits].forEach(dialog=>{
 dialog.querySelector("[data-close]").addEventListener("click",()=>dialog.close());
 dialog.addEventListener("click",event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close()});
 dialog.addEventListener("close",()=>{if(dialog.open)return;if(dialog===cinema){activeFilm=null;stopStream();player.pause();player.removeAttribute("src");player.load()}syncBackground()});
});
byId("copy").addEventListener("click",async()=>{
 const value=byId("contact").querySelector(".email").href.substring(7);
 try{await navigator.clipboard.writeText(value);byId("copy-status").textContent=translations[language].copied}
 catch{const range=document.createRange();range.selectNodeContents(document.querySelector(".email").firstChild);const sel=window.getSelection();sel.removeAllRanges();sel.addRange(range);byId("copy-status").textContent=translations[language].copyFallback}
});

const panels=[...document.querySelectorAll(".panel")];
const homeBar=document.querySelector(".hero-bar");
let currentPanel=null;
function route(){
 const target=panels.find(panel=>"#"+panel.id===location.hash)||null;
 const old=currentPanel;currentPanel=target;
 panels.forEach(panel=>{panel.hidden=panel!==target});
 homeBar.hidden=Boolean(target);inHero=!target;
 if(target===byId("work"))loadDecoder();
 document.querySelectorAll(".header nav a").forEach(a=>{
  if(target&&a.hash==="#"+target.id)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current");
 });
 if(target){target.scrollTop=0;const heading=target.querySelector("h2");heading.tabIndex=-1;heading.focus({preventScroll:true})}
 else if(old){document.querySelector(".watch").focus({preventScroll:true})}
 syncBackground();
}
window.addEventListener("hashchange",route);
const cards=[...document.querySelectorAll(".film-card")];
let selected=0;
function changeFilm(step){
 const old=cards[selected];
 selected=(selected+step+cards.length)%cards.length;
 const card=cards[selected];
 cards.forEach(item=>{item.getAnimations().forEach(animation=>animation.cancel());item.hidden=item!==card;item.inert=item!==card;item.style.zIndex=""});
 byId("position").textContent=String(selected+1).padStart(2,"0")+" / "+String(cards.length).padStart(2,"0");
 if(!matchMedia("(prefers-reduced-motion: reduce)").matches){
  old.hidden=false;old.inert=true;old.style.zIndex="0";card.style.zIndex="1";
  const exit=old.animate([{opacity:1,transform:"none"},{opacity:0,transform:"translateX("+(-step*9)+"%) scale(.95)"}],{duration:260,easing:"ease-out",fill:"forwards"});
  exit.onfinish=()=>{if(cards[selected]!==old)old.hidden=true;exit.cancel()};
  card.animate([{opacity:0,transform:"translateX("+(step*12)+"%) scale(.96)"},{opacity:1,transform:"none"}],{duration:380,easing:"cubic-bezier(.2,.8,.22,1)"});
 }
 if(old.contains(document.activeElement))card.querySelector("button").focus({preventScroll:true});
}
document.querySelectorAll("[data-direction]").forEach(button=>button.addEventListener("click",()=>changeFilm(Number(button.dataset.direction))));
const deck=byId("deck");let pointerStart=null,suppressClickUntil=0;
deck.addEventListener("pointerdown",e=>{if(e.isPrimary&&e.button===0)pointerStart={id:e.pointerId,x:e.clientX,y:e.clientY}});
window.addEventListener("pointerup",e=>{
 if(!pointerStart||e.pointerId!==pointerStart.id)return;
 const dx=e.clientX-pointerStart.x,dy=e.clientY-pointerStart.y;pointerStart=null;
 if(currentPanel===byId("work")&&Math.abs(dx)>45&&Math.abs(dx)>1.45*Math.abs(dy)){
  suppressClickUntil=performance.now()+350;changeFilm(dx<0?1:-1);
 }
});
window.addEventListener("pointercancel",()=>{pointerStart=null});
deck.addEventListener("click",e=>{if(performance.now()<suppressClickUntil){e.preventDefault();e.stopImmediatePropagation()}},true);
deck.addEventListener("dragstart",e=>e.preventDefault());
document.addEventListener("keydown",e=>{
 if(cinema.open||credits.open||e.target.tagName==="SELECT"||e.altKey||e.ctrlKey||e.metaKey)return;
 if(e.key==="Escape"&&currentPanel){location.hash="top";return}
 if(currentPanel===byId("work")&&["ArrowLeft","ArrowRight"].includes(e.key)){e.preventDefault();changeFilm(e.key==="ArrowLeft"?-1:1)}
});
const portrait=matchMedia("(max-aspect-ratio: 6/5)");
function setPosters(){const poster=portrait.matches?"assets/cover-portrait.jpg":"assets/cover.jpg";background.poster=poster}
portrait.addEventListener("change",()=>{
 setPosters();const playhead=background.currentTime;
 background.addEventListener("loadedmetadata",()=>{background.currentTime=Math.min(playhead,background.duration||0);syncBackground()},{once:true});
 background.load();
});
setPosters();updateLanguage(language);route();
