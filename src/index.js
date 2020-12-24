import { videoPlayerInit } from './module/videoPlayer.js';
import { radioPlayerInit } from './module/radioPlayer.js';
import { musicPlayerInit } from './module/musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
    temp.style.display = 'none';
    playerBtn.forEach(el => el.classList.remove('active'));
    playerBlock.forEach(el => el.classList.remove('active'));
    videoPlayerInit.stop();
    radioPlayerInit.stop();
    musicPlayerInit.stop();
};

playerBtn.forEach((btn, i) => btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
}));

videoPlayerInit();
radioPlayerInit();
musicPlayerInit();