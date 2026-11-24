const translations = {
 en: {
  versions:"Film versions",villaEditions:"Villa film · 3 versions",fullHD:"Full film · HD",shortEdit:"Short edit",guidedTour:"Guided tour",
  work:"Films",studio:"Studio",contact:"Contact",language:"Language",watch:"Our films",selected:"Our films",viewFilm:"Play film",prev:"Previous film",next:"Next film",home:"Back to home",
  scope:"Film production for real estate, architecture & construction.",perdiz:"Architectural concept film",villa:"Villa film",fpv:"FPV walkthrough",development:"Development film",tour:"Guided villa tour",
  studioTitle:"A film for every stage of the build.",about:"Based in Marbella, we organise film production for developers and builders. We plan the shoot around your project, from progress on site to the light in a finished room.",
  s1:"Development & launch films",s2:"Construction progress",s3:"Architecture & interiors",contactTitle:"Tell us about your project.",
  copy:"Copy email",copied:"Email copied",copyFallback:"Select the email address to copy it.",credits:"Film credits",creditText:"The La Concha landscape adapts a photograph by Hernán Piñera.",close:"Close",pause:"Pause background film",play:"Play background film",
  perdizNote:"Benahavís · A studio concept for a fictional hillside residence."
 },
 es: {
  versions:"Versiones de la película",villaEditions:"Película de villa · 3 versiones",fullHD:"Completa · HD",shortEdit:"Edición corta",guidedTour:"Visita guiada",
  work:"Películas",studio:"Estudio",contact:"Contacto",language:"Idioma",watch:"Nuestras películas",selected:"Nuestras películas",viewFilm:"Ver película",prev:"Película anterior",next:"Película siguiente",home:"Volver al inicio",
  scope:"Producción audiovisual para el sector inmobiliario, la arquitectura y la construcción.",perdiz:"Concepto audiovisual de arquitectura",villa:"Película de villa",fpv:"Recorrido FPV",development:"Película de promoción inmobiliaria",tour:"Visita guiada de la villa",
  studioTitle:"Una película para cada fase de la obra.",about:"Desde Marbella organizamos producciones audiovisuales para promotoras y constructoras. Planificamos cada rodaje en torno al proyecto, desde el avance de la obra hasta la luz de una estancia terminada.",
  s1:"Promociones y lanzamientos",s2:"Seguimiento de obra",s3:"Arquitectura e interiores",contactTitle:"Cuéntanos tu proyecto.",
  copy:"Copiar correo",copied:"Correo copiado",copyFallback:"Selecciona la dirección para copiarla.",credits:"Créditos",creditText:"El paisaje de La Concha es una adaptación de una fotografía de Hernán Piñera.",close:"Cerrar",pause:"Pausar vídeo de fondo",play:"Reproducir vídeo de fondo",
  perdizNote:"Benahavís · Concepto del estudio para una residencia ficticia en la ladera."
 },
 ru: {
  versions:"Версии фильма",villaEditions:"Фильм о вилле · 3 версии",fullHD:"Полный фильм · HD",shortEdit:"Короткий монтаж",guidedTour:"С ведущим",
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
 {key:"villa-alfa-hd", title:"Villa Alfa", kind:"villa", time:"03:00",
  poster:"films/villa-alfa-exterior.jpg", edition:"fullHD", cuts:[
   {key:"alfa-edit", kind:"villa", time:"00:29", portrait:true, edition:"shortEdit"},
   {key:"villa-alfa-2", kind:"tour", time:"00:38", portrait:true, edition:"guidedTour"}
  ]},
 {key:"madronal", title:"Madroñal", kind:"development", time:"00:45", portrait:true},
 {key:"cin-lento", title:"Cin Lento", kind:"villa", time:"00:58", portrait:true},
 {key:"hd-villa", title:"HD Villa", kind:"villa", time:"00:54", poster:"films/hd-villa-mountain.jpg"},
 {key:"perdiz", title:"La Perdiz", kind:"perdiz", time:"00:30", file:"la-perdiz.mp4", poster:"interior.jpg", place:"Benahavís", note:"perdizNote"}
];
const cardTemplate=byId("film-card-template");
films.forEach(film=>{
 const card=cardTemplate.content.firstElementChild.cloneNode(true);
 const button=card.querySelector("button"), title=card.querySelector("h3");
 card.dataset.key=film.key;
 title.id="title-"+film.key; title.textContent=film.title;
 button.dataset.film=film.key;button.setAttribute("aria-labelledby",title.id);
 const poster="assets/"+(film.poster||"films/"+film.key+".jpg");
 card.querySelector("source").srcset=poster;
 card.querySelector("img").src=film.portrait?"assets/films/"+film.key+"-cover.jpg":poster;
 card.querySelector(".runtime").textContent=film.time;
 card.querySelector("p").dataset.t=film.cuts?"villaEditions":film.kind;
 card.querySelector(".place").textContent=film.place||"";
 cardTemplate.before(card);
});
function addGlassRim(surface){
 const rim=document.createElement("span");
 rim.className="glass-rim";
 rim.setAttribute("aria-hidden","true");
 surface.append(rim);
}
document.querySelectorAll(".header nav,.watch,.film-card,.info-sheet,.contact-sheet,.pager").forEach(addGlassRim);
byId("position").textContent="01 / "+String(films.length).padStart(2,"0");
let language="en", activeFilm, inHero=false, wantsMotion=!matchMedia("(prefers-reduced-motion: reduce)").matches;
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
 versions.setAttribute("aria-label",words.versions);
 document.querySelectorAll("[data-t]").forEach(el=>{el.textContent=words[el.dataset.t]});
 document.querySelectorAll("[data-close]").forEach(el=>el.setAttribute("aria-label",words.close));
 if(activeFilm)byId("film-description").textContent=words[activeFilm.note||activeFilm.kind];
 byId("prev").setAttribute("aria-label",words.prev);
 byId("next").setAttribute("aria-label",words.next);
 byId("copy-status").textContent="";syncControl();
}
let introReady=false, introBufferTimer;
function finishIntroBuffer(){
 introReady=true;
 clearTimeout(introBufferTimer);
 background.removeEventListener("progress",checkIntroBuffer);
 background.removeEventListener("canplaythrough",checkIntroBuffer);
 syncBackground();
}
function checkIntroBuffer(){
 const buffered=background.buffered;
 if(buffered.length&&buffered.end(0)-background.currentTime>=2)finishIntroBuffer();
}
function syncBackground(){
 if(!wantsMotion||document.hidden||!inHero||cinema.open||credits.open){background.pause();return}
 if(!introReady){
  if(!introBufferTimer){
   background.addEventListener("progress",checkIntroBuffer);
   background.addEventListener("canplaythrough",checkIntroBuffer);
   // Some mobile browsers fetch media only once play() is called.
   introBufferTimer=setTimeout(finishIntroBuffer,2600);
   background.preload="auto";
   background.load();
  }
  return;
 }
 background.play().catch(err=>{if(err.name==="AbortError")return;wantsMotion=false;syncControl()});
}
motion.addEventListener("click",()=>{wantsMotion=!wantsMotion;syncControl();syncBackground()});
document.addEventListener("visibilitychange",syncBackground);

byId("lang").addEventListener("change",event=>{updateLanguage(event.target.value);try{localStorage.setItem("1media-language",language)}catch{}});
// The native player handles HLS on Safari. Other browsers load the decoder
// when the gallery is opened, keeping it off the homepage's critical path.
const nativeHls=Boolean(player.canPlayType("application/vnd.apple.mpegurl"));
let decoderPromise, stream, playbackRequest=0;
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
 playbackRequest++;
 player.onerror=null;
 const oldStream=stream;
 stream=null;
 oldStream?.destroy();
}
async function startFilm(film){
 const filename=film.file||film.key+".mp4";
 const manifest="assets/stream/"+filename.slice(0,-4)+"/master.m3u8";
 const direct="assets/fallback/"+filename;
 const request=playbackRequest;
 const isCurrent=()=>request===playbackRequest&&activeFilm===film&&cinema.open;
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
const versions=byId("film-versions");
function selectEdition(film){
 stopStream();
 player.pause();
 activeFilm=film;
 byId("film-description").textContent=translations[language][film.note||film.kind];
 cinema.classList.toggle("portrait-film",Boolean(film.portrait));
 player.poster="assets/"+(film.poster||"films/"+film.key+".jpg");
 for(const button of versions.children){
  button.setAttribute("aria-pressed",String(button.dataset.edition===film.key));
 }
 startFilm(film);
}
function openFilm(key){
 const project=films.find(item=>item.key===key);
 versions.replaceChildren();
 versions.hidden=!project.cuts;
 if(project.cuts){
  for(const film of [project,...project.cuts]){
   const button=document.createElement("button");
   button.type="button";
   button.dataset.edition=film.key;
   const label=document.createElement("span");
   label.dataset.t=film.edition;
   label.textContent=translations[language][film.edition];
   const duration=document.createElement("small");
   duration.textContent=film.time;
   button.append(label,duration);
   button.addEventListener("click",()=>{if(activeFilm!==film)selectEdition(film)});
   versions.append(button);
  }
 }
 byId("film-name").textContent=project.title;
 cinema.showModal();
 syncBackground();
 selectEdition(project);
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
const navigation=[...document.querySelectorAll(".header nav a")];
let currentPanel=null;
let scrollFrame=0;
function updateSection(){
 scrollFrame=0;
 const marker=window.innerHeight*.45;
 const atBottom=window.scrollY+window.innerHeight>=document.documentElement.scrollHeight-2;
 let visible=null;
 for(const panel of panels){
  if(panel.getBoundingClientRect().top<=marker)visible=panel;
 }
 if(atBottom)visible=panels[panels.length-1];
 if(currentPanel===visible)return;
 currentPanel=visible;
 for(const link of navigation){
  if(visible&&link.hash==="#"+visible.id)link.setAttribute("aria-current","location");
  else link.removeAttribute("aria-current");
 }
 if(visible===byId("work"))loadDecoder();
}
function queueSectionUpdate(){
 if(!scrollFrame)scrollFrame=requestAnimationFrame(updateSection);
}
window.addEventListener("scroll",queueSectionUpdate,{passive:true});
window.addEventListener("resize",queueSectionUpdate);
const heroVisibility=new IntersectionObserver(([entry])=>{
 inHero=entry.isIntersecting&&entry.intersectionRatio>=.08;
 syncBackground();
},{threshold:[0,.08]});
heroVisibility.observe(byId("top"));
const deck=byId("deck");
const cards=[...deck.querySelectorAll(".film-card")];
const marks=films.map((film,index)=>{
 const mark=document.createElement("button");
 mark.type="button";
 mark.title=film.title;
 mark.setAttribute("aria-label",film.title);
 mark.setAttribute("aria-controls","deck");
 mark.addEventListener("click",()=>showFilm(index));
 byId("film-marks").append(mark);
 return mark;
});
marks[0].setAttribute("aria-current","true");
const rimVisibility=new IntersectionObserver(entries=>{
 for(const entry of entries)entry.target.classList.toggle("rim-visible",entry.isIntersecting);
});
cards.forEach(card=>rimVisibility.observe(card));
let selected=0, destination=null;
function syncFilmPosition(){
 const spacing=cards[1].offsetLeft-cards[0].offsetLeft;
 const index=Math.max(0,Math.min(cards.length-1,Math.round(deck.scrollLeft/spacing)));
 if(index!==selected){
  marks[selected].removeAttribute("aria-current");
  selected=index;
  marks[index].setAttribute("aria-current","true");
  byId("position").textContent=String(index+1).padStart(2,"0")+" / "+String(cards.length).padStart(2,"0");
 }
 if(index===destination)destination=null;
}
deck.addEventListener("scroll",syncFilmPosition,{passive:true});
new ResizeObserver(syncFilmPosition).observe(deck);
deck.addEventListener("wheel",()=>{destination=null},{passive:true});
function showFilm(index,instant=false){
 destination=index;
 const card=cards[index];
 const left=card.offsetLeft-cards[0].offsetLeft;
 const behavior=instant||matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth";
 if(deck.contains(document.activeElement))card.querySelector("button").focus({preventScroll:true});
 deck.scrollTo({left,behavior});
}
function changeFilm(step){
 const from=destination??selected;
 const next=(from+step+cards.length)%cards.length;
 showFilm(next,Math.abs(next-from)>1);
}
document.querySelectorAll("[data-direction]").forEach(button=>button.addEventListener("click",()=>changeFilm(Number(button.dataset.direction))));

// Touch and trackpads use native scrolling. Mouse dragging tracks the pointer.
let drag=null,ignoreDragClick=false;
deck.addEventListener("pointerdown",event=>{
 destination=null;
 ignoreDragClick=false;
 if(event.pointerType!=="mouse"||event.button!==0)return;
 drag={id:event.pointerId,x:event.clientX,y:event.clientY,left:deck.scrollLeft,index:selected,active:false};
});
window.addEventListener("pointermove",event=>{
 if(!drag||event.pointerId!==drag.id)return;
 const dx=event.clientX-drag.x;
 if(!drag.active){
  if(Math.abs(dx)<7||Math.abs(dx)<Math.abs(event.clientY-drag.y))return;
  drag.active=true;
  deck.classList.add("dragging");
  deck.setPointerCapture(event.pointerId);
 }
 deck.scrollLeft=drag.left-dx;
});
function endDrag(event){
 if(!drag||event.pointerId!==drag.id)return;
 const start=drag;
 drag=null;
 if(!start.active)return;
 const dx=event.clientX-start.x;
 const spacing=cards[1].offsetLeft-cards[0].offsetLeft;
 let next=Math.round(deck.scrollLeft/spacing);
 if(event.type==="pointerup"&&next===start.index&&Math.abs(dx)>spacing*.12)next-=Math.sign(dx);
 ignoreDragClick=true;
 deck.classList.remove("dragging");
 if(deck.hasPointerCapture(event.pointerId))deck.releasePointerCapture(event.pointerId);
 showFilm(Math.max(0,Math.min(cards.length-1,next)));
}
window.addEventListener("pointerup",endDrag);
window.addEventListener("pointercancel",endDrag);
deck.addEventListener("click",event=>{
 if(ignoreDragClick&&event.detail>0){event.preventDefault();event.stopImmediatePropagation()}
},true);
deck.addEventListener("dragstart",e=>e.preventDefault());
document.addEventListener("keydown",e=>{
 if(cinema.open||credits.open||e.target.tagName==="SELECT"||e.altKey||e.ctrlKey||e.metaKey)return;
 if(currentPanel===byId("work")&&["ArrowLeft","ArrowRight"].includes(e.key)){e.preventDefault();changeFilm(e.key==="ArrowLeft"?-1:1)}
});
const portrait=matchMedia("(max-aspect-ratio: 6/5)");
function setPosters(){const poster=portrait.matches?"assets/cover-portrait.jpg":"assets/cover.jpg";background.poster=poster}
portrait.addEventListener("change",()=>{
 setPosters();const playhead=background.currentTime;
 background.addEventListener("loadedmetadata",()=>{background.currentTime=Math.min(playhead,background.duration||0);syncBackground()},{once:true});
 background.load();
});
setPosters();updateLanguage(language);updateSection();
