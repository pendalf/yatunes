export const radioPlayerInit = () => {

    // получение элементов управиления
    const radio = document.querySelector('.radio');
    const radioCoverImg = document.querySelector('.radio-cover__img');
    const radioItem = document.querySelectorAll('.radio-item');
    const raradioHeaderBig = document.querySelector('.radio-header__big');
    const radioStop = document.querySelector('.radio-stop');
    const radioNavigation = document.querySelector('.radio-navigation');

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
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
        toggleIcon();
    });
};