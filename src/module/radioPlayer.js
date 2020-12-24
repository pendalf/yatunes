export const radioPlayerInit = () => {

    // получение элементов управиления
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const raradioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const radioNavigation = document.querySelector('.radio-navigation');
    const radioVolume = document.querySelector('.radio-volume');
    const radioVolumeMute = document.querySelector('.radio-volume__mute');
    const radioVolumeDown = document.querySelector('.radio-volume__down');
    const radioVolumeUp = document.querySelector('.radio-volume__up');

    // Конструктор аудио
    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;


    // Переключение иконок
    const toggleIcon = () => {
        if (audio.paused) {
            radio.classList.remove('play');
            radioStop.classList.remove('fa-stop');
            radioStop.classList.add('fa-play');
        } else {
            radio.classList.add('play');
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    };

    // Визуализация переключения радиостанций
    const selectItem = elem => {
        radioItem.forEach(el => el.classList.remove('select'));
        elem.classList.add('select');
    };


    // Переключение проигрывания радио
    const togglePlay = e => {
        e.preventDefault();
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        toggleIcon();
    };

    // Изменение громкости
    const changeValume = (direction = 0) => {
        if (direction !== 0) {
            radioVolume.value = +radioVolume.value + (direction * 10);
            if (radioVolume.value > 100) {
                radioVolume.value = 100;
            } else if (radioVolume.value < 0) {
                radioVolume.value = 0;
            }
        }
        const valueVolume = radioVolume.value;
        audio.volume = valueVolume / 100;
        toggleMuteIcon();
    };

    // Реакция иконки включения/выключения звука
    const toggleMuteIcon = () => {
        if (radioVolume.value > 0) {
            radioVolumeMute.classList.remove('disabled');
        } else {
            radioVolumeMute.classList.add('disabled');
        }
    };

    // Включение/выключение звука
    const toggleMute = () => {
        if (radioVolume.value > 0) {
            radioVolume.setAttribute('data-old-volume', radioVolume.value);
            radioVolume.value = 0;
            audio.volume = 0;
        } else {
            let volumeOld = radioVolume.getAttribute('data-old-volume');
            if (volumeOld === null) {
                radioVolume.setAttribute('data-old-volume', 0);
                volumeOld = 0;
            }
            radioVolume.value = volumeOld;
            audio.volume = volumeOld / 100;
        }
        toggleMuteIcon();
    };



    //  Переключение радиостанций
    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        const parrent = target.closest('.radio-item');

        const title = parrent.querySelector('.radio-name').textContent;
        raradioHeaderBig.textContent = title;

        const img = parrent.querySelector('.radio-img').src;
        radioCoverImg.src = img;



        radioStop.disabled = false;
        audio.src = target.dataset.radioStantion;
        audio.play();
        toggleIcon();
        selectItem(parrent);
    });

    // Включение/выключение проигрывания радиостанции
    radioStop.addEventListener('click', event => {
        togglePlay(event);
    });

    // Управление громкостью
    changeValume();
    radioVolume.addEventListener('input', () => {
        changeValume();
    });
    radioVolumeMute.addEventListener('click', toggleMute);
    radioVolumeDown.addEventListener('click', () => {
        changeValume(-1);
    });
    radioVolumeUp.addEventListener('click', () => {
        changeValume(1);
    });

    // Обработка нажатий клавиш
    document.addEventListener('keydown', event => {
        if (radio.closest('.player-block').classList.contains('active')) {

            switch (event.code) {
                case 'Space':
                    togglePlay(event);
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

                default:
                    break;
            }
        }
    });

    // Метод остановки плеера
    radioPlayerInit.stop = () => {
        audio.pause();
        toggleIcon();
    };
};