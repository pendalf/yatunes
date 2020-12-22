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
    const togglePlay = () => {
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
    const changeValume = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;
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
    videoVolume.addEventListener('input', changeValume);

    // Переключение в полноэкранный режим
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    // Позиционирование ползунка громкости при ее изменении в полноэкранном режиме
    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = videoPlayer.volume * 100;
    });

};