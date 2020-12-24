import { addZero } from './supScript.js';

export const musicPlayerInit = () => {

    // получение элементов управиления
    const audio = document.querySelector('.audio');
    const audioImg = document.querySelector('.audio-img');
    const audioHeader = document.querySelector('.audio-header');
    const audioPlayer = document.querySelector('.audio-player');
    const audioNavigation = document.querySelector('.audio-navigation');
    const audioButtonPlay = document.querySelector('.audio-button__play');
    const audioTimePassed = document.querySelector('.audio-time__passed');
    const audioProgress = document.querySelector('.audio-progress');
    const audioProgressTiming = document.querySelector('.audio-progress__timing');
    const audioTimeTotal = document.querySelector('.audio-time__total');

    const audioVolume = document.querySelector('.audio-volume');
    const audioVolumeMute = document.querySelector('.audio-volume__mute');
    const audioVolumeDown = document.querySelector('.audio-volume__down');
    const audioVolumeUp = document.querySelector('.audio-volume__up');

    const playlist = ['hello', 'flow', 'speed'];
    let pressShift = false;

    let trackIndex = 0;

    // Загрузка трека
    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;

        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    // Предыдущий трек
    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    };

    // Следующий трек
    const nextTrack = () => {
        if (trackIndex !== playlist.length - 1) {
            trackIndex++;
        } else {
            trackIndex = 0;
        }
        loadTrack();
    };

    // Переключение иконок
    const toggleIcon = () => {
        if (audioPlayer.paused) {
            audio.classList.remove('play');
            audioButtonPlay.classList.add('fa-play');
            audioButtonPlay.classList.remove('fa-pause');
        } else {
            audio.classList.add('play');
            audioButtonPlay.classList.remove('fa-play');
            audioButtonPlay.classList.add('fa-pause');
        }
    };

    // Переключение проигрывания радио
    const togglePlay = e => {
        e.preventDefault();
        if (audioPlayer.paused) {
            audioPlayer.play();
        } else {
            audioPlayer.pause();
        }
        toggleIcon();
    };

    // Изменение громкости
    const changeValume = (direction = 0) => {
        if (direction !== 0) {
            audioVolume.value = +audioVolume.value + (direction * 10);
            if (audioVolume.value > 100) {
                audioVolume.value = 100;
            } else if (audioVolume.value < 0) {
                audioVolume.value = 0;
            }
        }
        const valueVolume = audioVolume.value;
        audioPlayer.volume = valueVolume / 100;
        toggleMuteIcon();
    };

    // Реакция иконки включения/выключения звука
    const toggleMuteIcon = () => {
        if (audioVolume.value > 0) {
            audioVolumeMute.classList.remove('disabled');
        } else {
            audioVolumeMute.classList.add('disabled');
        }
    };

    // Включение/выключение звука
    const toggleMute = () => {
        if (audioVolume.value > 0) {
            audioVolume.setAttribute('data-old-volume', audioVolume.value);
            audioVolume.value = 0;
            audioPlayer.volume = 0;
        } else {
            let volumeOld = audioVolume.getAttribute('data-old-volume');
            if (volumeOld === null) {
                audioVolume.setAttribute('data-old-volume', 0);
                volumeOld = 0;
            }
            audioVolume.value = volumeOld;
            audioPlayer.volume = volumeOld / 100;
        }
        toggleMuteIcon();
    };

    // навигация по трекам
    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        if (target.classList.contains('audio-button__play')) {

            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            toggleIcon();

            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }

        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }
    });

    // Изменение значения шкалы времени проигрывателя
    const timeUpdate = (direction = 0) => {
        if (direction !== 0) {
            const duration = audioPlayer.duration;
            let currentTime = audioPlayer.currentTime;

            currentTime += (direction * 10);
            if (currentTime > duration) {
                currentTime = duration;
            } else if (currentTime < 0) {
                currentTime = 0;
            }
            audioPlayer.currentTime = currentTime;
        }
    };

    // переключение на новый трек после окончания текущего
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    // Обновление времени проигрывния трека
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress = currentTime / duration * 100;

        audioProgressTiming.style.width = progress + '%';

        let minutePassed = Math.floor(currentTime / 60) || 0;
        let secondsPassed = Math.floor(currentTime % 60) || 0;

        let minuteTotal = Math.floor(duration / 60) || 0;
        let secondsTotal = Math.floor(duration % 60) || 0;

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        audioTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    // перемотка трека
    audioProgress.addEventListener('click', e => {
        const x = e.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });

    // Управление громкостью
    changeValume();
    audioVolume.addEventListener('input', () => {
        changeValume();
    });
    audioVolumeMute.addEventListener('click', toggleMute);
    audioVolumeDown.addEventListener('click', () => {
        changeValume(-1);
    });
    audioVolumeUp.addEventListener('click', () => {
        changeValume(1);
    });


    // Обработка нажатий клавиш
    document.addEventListener('keydown', event => {
        if (audioPlayer.closest('.player-block').classList.contains('active')) {

            switch (event.code) {
                case 'Space':
                    togglePlay(event);
                    break;
                case 'ArrowRight':
                    if (pressShift) {
                        prevTrack();
                    } else {
                        timeUpdate(1);
                    }
                    break;
                case 'ArrowLeft':
                    if (pressShift) {
                        nextTrack();
                    } else {
                        timeUpdate(-1);
                    }
                    break;
                case 'ArrowUp':
                    event.preventDefault();
                    changeValume(1);
                    break;
                case 'ArrowDown':
                    event.preventDefault();
                    changeValume(-1);
                    break;
                case 'KeyM':
                    toggleMute();
                    break;
                case 'ShiftLeft':
                case 'ShiftRight':
                    pressShift = true;
                    break;

                default:
                    break;
            }
        }
    });
    // Обработка нажатий клавиш
    document.addEventListener('keyup', event => {
        if (audioPlayer.closest('.player-block').classList.contains('active')) {
            switch (event.code) {

                case 'ShiftLeft':
                case 'ShiftRight':
                    pressShift = false;
                    break;

                default:
                    break;
            }
        }
    });

    musicPlayerInit.stop = () => {
        audioPlayer.pause();
        toggleIcon();
    };
};