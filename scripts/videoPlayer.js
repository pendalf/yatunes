export const videoPlayerInit = () => {

    // получение элементов управиления
    const videoPlayer = document.querySelector('.video-player');
    const videoButtonPlay = document.querySelector('.video-button__play');
    const videoButtonStop = document.querySelector('.video-button__stop');
    const videoProgress = document.querySelector('.video-progress');
    const videoTimePassed = document.querySelector('.video-time__passed');
    const videoTimeTotal = document.querySelector('.video-time__total');
    const videoVolume = document.querySelector('.video-volume');
    const videoFullscreen = document.querySelector('.video-fullscreen');
    const videoVolumeMute = document.querySelector('.video-volume__mute');
    const videoVolumeDown = document.querySelector('.video-volume__down');
    const videoVolumeUp = document.querySelector('.video-volume__up');

    // Переключение иконок
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.remove('fa-play');
            videoButtonPlay.classList.add('fa-pause');
        }
    };

    // Переключение проигрывания видео
    const togglePlay = (e) => {
        e.preventDefault();

        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }
    };

    // Остановка проигрывателя
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    };

    // Добавление переднего нуля для числе меньше 10
    const addZero = n => n < 10 ? '0' + n : n;

    // Изменение громкости
    const changeValume = (direction = 0) => {
        if (direction !== 0) {
            videoVolume.value = +videoVolume.value + (direction * 10);
            if (videoVolume.value > 100) {
                videoVolume.value = 100;
            } else if (videoVolume.value < 0) {
                videoVolume.value = 0;
            }
        }
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;
        toggleMuteIcon();
    };

    // Реакция иконки включения/выключения звука
    const toggleMuteIcon = () => {
        if (videoVolume.value > 0) {
            videoVolumeMute.classList.remove('disabled');
        } else {
            videoVolumeMute.classList.add('disabled');
        }
    };

    // Включение/выключение звука
    const toggleMute = () => {
        if (videoVolume.value > 0) {
            videoVolume.setAttribute('data-old-volume', videoVolume.value);
            videoVolume.value = 0;
            videoPlayer.volume = 0;
        } else {
            let volumeOld = videoVolume.getAttribute('data-old-volume');
            if (volumeOld === null) {
                videoVolume.setAttribute('data-old-volume', 0);
                volumeOld = 0;
            }
            videoVolume.value = volumeOld;
            videoPlayer.volume = volumeOld / 100;
        }
        toggleMuteIcon();
    };



    // Навешиывание событий на элементы управления
    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);

    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);

    videoButtonStop.addEventListener('click', stopPlay);

    // Обновление времени проигрывния видео
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        videoProgress.value = (currentTime / duration) * 100;

        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    // Промотка видео ползунком
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (duration * value) / 100;
    });
    changeValume();
    videoVolume.addEventListener('input', () => {
        changeValume();
    });

    // Переключение в полноэкранный режим
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    // Позиционирование ползунка громкости при ее изменении в полноэкранном режиме
    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = videoPlayer.volume * 100;
    });

    // Работа с кнопками громкости
    videoVolumeMute.addEventListener('click', toggleMute);
    videoVolumeDown.addEventListener('click', () => {
        changeValume(-1);
    });
    videoVolumeUp.addEventListener('click', () => {
        changeValume(1);
    });

};