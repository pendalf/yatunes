(()=>{"use strict";const e=e=>e<10?"0"+e:e,t=()=>{const a=document.querySelector(".video-player"),o=document.querySelector(".video-button__play"),l=document.querySelector(".video-button__stop"),s=document.querySelector(".video-progress"),c=document.querySelector(".video-time__passed"),u=document.querySelector(".video-time__total"),r=document.querySelector(".video-volume"),n=document.querySelector(".video-fullscreen"),d=document.querySelector(".video-volume__mute"),i=document.querySelector(".video-volume__down"),v=document.querySelector(".video-volume__up"),m=()=>{a.paused?(o.classList.remove("fa-pause"),o.classList.add("fa-play")):(o.classList.remove("fa-play"),o.classList.add("fa-pause"))},p=e=>{e.preventDefault(),a.paused&&a.closest(".player-block").classList.contains("active")?a.play():a.pause()},y=(e=0)=>{0!==e&&(r.value=+r.value+10*e,r.value>100?r.value=100:r.value<0&&(r.value=0));const t=r.value;a.volume=t/100,L()},L=()=>{r.value>0?d.classList.remove("disabled"):d.classList.add("disabled")},f=()=>{if(r.value>0)r.setAttribute("data-old-volume",r.value),r.value=0,a.volume=0;else{let e=r.getAttribute("data-old-volume");null===e&&(r.setAttribute("data-old-volume",0),e=0),r.value=e,a.volume=e/100}L()},S=(e=0)=>{const t=a.duration;let o=a.currentTime;if(0!==e)o+=5*e,s.value=o/t*100,a.currentTime=o;else{const e=s.value;a.currentTime=t*e/100}},b=()=>{document.fullscreenElement||document.mozFullScreenElement||document.webkitFullscreenElement||document.msFullscreenElement?(document.exitFullscreen?document.exitFullscreen():document.msExitFullscreen?document.msExitFullscreen():document.mozCancelFullScreen?document.mozCancelFullScreen():document.webkitExitFullscreen&&document.webkitExitFullscreen(),a.controls=!1):(a.requestFullscreen?a.requestFullscreen():a.msRequestFullscreen?a.msRequestFullscreen():a.mozRequestFullScreen?a.mozRequestFullScreen():a.webkitRequestFullscreen&&a.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT),a.controls=!0)};a.addEventListener("click",p),o.addEventListener("click",p),a.addEventListener("play",m),a.addEventListener("pause",m),l.addEventListener("click",(()=>{a.pause(),a.currentTime=0})),a.addEventListener("timeupdate",(()=>{const t=a.currentTime,o=a.duration;s.value=t/o*100;let l=Math.floor(t/60),r=Math.floor(t%60),n=Math.floor(o/60),d=Math.floor(o%60);c.textContent=`${e(l)}:${e(r)}`,u.textContent=`${e(n)}:${e(d)}`})),s.addEventListener("input",(()=>{S()})),y(),r.addEventListener("input",(()=>{y()})),n.addEventListener("click",b),a.addEventListener("volumechange",(()=>{r.value=100*a.volume})),d.addEventListener("click",f),i.addEventListener("click",(()=>{y(-1)})),v.addEventListener("click",(()=>{y(1)})),document.addEventListener("keydown",(e=>{if(a.closest(".player-block").classList.contains("active"))switch(e.code){case"Space":p(e);break;case"ArrowRight":S(1);break;case"ArrowLeft":S(-1);break;case"ArrowUp":e.preventDefault(),y(1);break;case"ArrowDown":e.preventDefault(),y(-1);break;case"KeyM":f();break;case"KeyF":b()}})),t.stop=()=>{a.pause(),m()}},a=()=>{const e=document.querySelector(".radio"),t=document.querySelector(".radio-cover__img"),o=document.querySelectorAll(".radio-item"),l=document.querySelector(".radio-header__big"),s=document.querySelector(".radio-stop"),c=document.querySelector(".radio-navigation"),u=document.querySelector(".radio-volume"),r=document.querySelector(".radio-volume__mute"),n=document.querySelector(".radio-volume__down"),d=document.querySelector(".radio-volume__up"),i=new Audio;i.type="audio/aac",s.disabled=!0;const v=()=>{i.paused?(e.classList.remove("play"),s.classList.remove("fa-stop"),s.classList.add("fa-play")):(e.classList.add("play"),s.classList.remove("fa-play"),s.classList.add("fa-stop"))},m=e=>{e.preventDefault(),i.paused?i.play():i.pause(),v()},p=(e=0)=>{0!==e&&(u.value=+u.value+10*e,u.value>100?u.value=100:u.value<0&&(u.value=0));const t=u.value;i.volume=t/100,y()},y=()=>{u.value>0?r.classList.remove("disabled"):r.classList.add("disabled")},L=()=>{if(u.value>0)u.setAttribute("data-old-volume",u.value),u.value=0,i.volume=0;else{let e=u.getAttribute("data-old-volume");null===e&&(u.setAttribute("data-old-volume",0),e=0),u.value=e,i.volume=e/100}y()};c.addEventListener("change",(e=>{const a=e.target,c=a.closest(".radio-item"),u=c.querySelector(".radio-name").textContent;l.textContent=u;const r=c.querySelector(".radio-img").src;var n;t.src=r,s.disabled=!1,i.src=a.dataset.radioStantion,i.play(),v(),n=c,o.forEach((e=>e.classList.remove("select"))),n.classList.add("select")})),s.addEventListener("click",(e=>{m(e)})),p(),u.addEventListener("input",(()=>{p()})),r.addEventListener("click",L),n.addEventListener("click",(()=>{p(-1)})),d.addEventListener("click",(()=>{p(1)})),document.addEventListener("keydown",(t=>{if(e.closest(".player-block").classList.contains("active"))switch(t.code){case"Space":m(t);break;case"ArrowUp":t.preventDefault(),p(1);break;case"ArrowDown":t.preventDefault(),p(-1);break;case"KeyM":L()}})),a.stop=()=>{i.pause(),v()}},o=()=>{const t=document.querySelector(".audio"),a=document.querySelector(".audio-img"),l=document.querySelector(".audio-header"),s=document.querySelector(".audio-player"),c=document.querySelector(".audio-navigation"),u=document.querySelector(".audio-button__play"),r=document.querySelector(".audio-time__passed"),n=document.querySelector(".audio-progress"),d=document.querySelector(".audio-progress__timing"),i=document.querySelector(".audio-time__total"),v=document.querySelector(".audio-volume"),m=document.querySelector(".audio-volume__mute"),p=document.querySelector(".audio-volume__down"),y=document.querySelector(".audio-volume__up"),L=["hello","flow","speed"];let f=!1,S=0;const b=()=>{const e=s.paused,t=L[S];a.src=`./audio/${t}.jpg`,l.textContent=t.toUpperCase(),s.src=`./audio/${t}.mp3`,e?s.pause():s.play()},q=()=>{0!==S?S--:S=L.length-1,b()},k=()=>{S!==L.length-1?S++:S=0,b()},E=()=>{s.paused?(t.classList.remove("play"),u.classList.add("fa-play"),u.classList.remove("fa-pause")):(t.classList.add("play"),u.classList.remove("fa-play"),u.classList.add("fa-pause"))},_=(e=0)=>{0!==e&&(v.value=+v.value+10*e,v.value>100?v.value=100:v.value<0&&(v.value=0));const t=v.value;s.volume=t/100,h()},h=()=>{v.value>0?m.classList.remove("disabled"):m.classList.add("disabled")},w=()=>{if(v.value>0)v.setAttribute("data-old-volume",v.value),v.value=0,s.volume=0;else{let e=v.getAttribute("data-old-volume");null===e&&(v.setAttribute("data-old-volume",0),e=0),v.value=e,s.volume=e/100}h()};c.addEventListener("click",(e=>{const t=e.target;if(t.classList.contains("audio-button__play")){s.paused?s.play():s.pause(),E();const e=L[S];l.textContent=e.toUpperCase()}t.classList.contains("audio-button__prev")&&q(),t.classList.contains("audio-button__next")&&k()}));const A=(e=0)=>{if(0!==e){const t=s.duration;let a=s.currentTime;a+=10*e,a>t?a=t:a<0&&(a=0),s.currentTime=a}};s.addEventListener("ended",(()=>{k(),s.play()})),s.addEventListener("timeupdate",(()=>{const t=s.duration,a=s.currentTime,o=a/t*100;d.style.width=o+"%";let l=Math.floor(a/60)||0,c=Math.floor(a%60)||0,u=Math.floor(t/60)||0,n=Math.floor(t%60)||0;r.textContent=`${e(l)}:${e(c)}`,i.textContent=`${e(u)}:${e(n)}`})),n.addEventListener("click",(e=>{const t=e.offsetX/n.clientWidth*s.duration;s.currentTime=t})),_(),v.addEventListener("input",(()=>{_()})),m.addEventListener("click",w),p.addEventListener("click",(()=>{_(-1)})),y.addEventListener("click",(()=>{_(1)})),document.addEventListener("keydown",(e=>{if(s.closest(".player-block").classList.contains("active"))switch(e.code){case"Space":e.preventDefault(),s.paused?s.play():s.pause(),E();break;case"ArrowRight":f?q():A(1);break;case"ArrowLeft":f?k():A(-1);break;case"ArrowUp":e.preventDefault(),_(1);break;case"ArrowDown":e.preventDefault(),_(-1);break;case"KeyM":w();break;case"ShiftLeft":case"ShiftRight":f=!0}})),document.addEventListener("keyup",(e=>{if(s.closest(".player-block").classList.contains("active"))switch(e.code){case"ShiftLeft":case"ShiftRight":f=!1}})),o.stop=()=>{s.pause(),E()}},l=document.querySelectorAll(".player-btn"),s=document.querySelectorAll(".player-block"),c=document.querySelector(".temp");l.forEach(((e,u)=>e.addEventListener("click",(()=>{c.style.display="none",l.forEach((e=>e.classList.remove("active"))),s.forEach((e=>e.classList.remove("active"))),t.stop(),a.stop(),o.stop(),e.classList.add("active"),s[u].classList.add("active")})))),t(),a(),o()})();