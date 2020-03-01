window.addEventListener('DOMContentLoaded', function() {

    let infoTabContent = document.querySelectorAll('.info-tabcontent'),
        infoHeaderTab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info');
    
    function manageContent(_contentMassive, _TabsMassive, _parent){
    
        function delCont(n) {
            for (let i = n; i < infoTabContent.length; i++) {
                infoTabContent[i].classList.remove('show');
                infoTabContent[i].classList.add('hide');
                
            }
        }
        delCont(1);

        info.addEventListener('click', function(e) {
            for (let i = 0; i < infoHeaderTab.length; i++) {
                if (e.target == infoHeaderTab[i]){
                    delCont(0);
                    infoTabContent[i].classList.remove('hide');
                    infoTabContent[i].classList.add('show');
                }

                if (e.target == descriptBtn[i]) {
                    overlayFade.style.display = 'block';
                }
            }
        })
    }
    manageContent(infoTabContent, infoHeaderTab, info);

    //Timer
    let deadLine = '2020-02-19';

    function getTimeRemaining (endtime) {
        let time = Date.parse(endtime) - Date.parse(new Date());
        if (time > 0){
            seconds = Math.floor((time / 1000) % 60),
            minutes = Math.floor((time / 1000 / 60) % 60),
            hours = Math.floor((time / 1000 /60 /60));
        
            return {
                'total' : time,
                'seconds' : seconds,
                'minutes' : minutes,
                'hours' : hours
            }
        } else {
            return {
                'total' : 0,
                'seconds' : '00',
                'minutes' : '00',
                'hours' : '00'
            }
        }
    }
    
    function setTimer (id, endtime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            interval = setInterval(setClock, 1000);

        
    
    
    
        function setClock () {
            let t = getTimeRemaining(endtime);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(interval);
            }

        }
    }

    setTimer('timer', deadLine);

    let more = document.querySelector('.more'),
        overlayFade = document.querySelector('.overlay'),
        close = document.querySelector('.popup-close'),
        descriptBtn = document.querySelectorAll('.description-btn');

    more.addEventListener('click', function() {
        overlayFade.style.display = 'block';
        this.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    })

    close.addEventListener('click', function() {
        overlayFade.style.display = 'none';
        more.classList.remove('more-splash');
        document.body.style.overflow = '';
    })
    //Form

    let message = {
        loading: 'LOADING...',
        success: 'Спасибо! Скоро мы с вами свяжемся.',
        failure: 'Error'
    };

    let form = document.querySelector('.main-form'),
        input = form.getElementsByTagName('input'),
        statusMessage = document.createElement('div');
    
        statusMessage.classList.add('status');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        form.appendChild(statusMessage);

        let request = new XMLHttpRequest();
        request.open('POST', 'server.php');
        request.setRequestHeader('Content-type', 'application/json; charset=utf8')
        
        let formData = new FormData(form);
        let obj = {};
        formData.forEach(function(value, key) {
            obj[key] = value;
        })

        let json = JSON.stringify(obj);
        request.send(json);

        request.addEventListener('readystatechange', function() {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;

            } else if (request.readyState === 4 && request.status == 200 ) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });
        for(let i = 0; i < input.length; i++) {
            input[i].value = '';
        }
    });

    //Contact Form

    let contactForm = document.getElementById('form'),
        contactInput = contactForm.getElementsByTagName('input');


    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        contactForm.appendChild(statusMessage);

        let contactRequest = new XMLHttpRequest();
        contactRequest.open('POST', 'server.php');
        contactRequest.setRequestHeader('Content-type', 'application/json; charset=utf8');

        let cotactData = new FormData(contactForm);
        let contactObj = {};

        cotactData.forEach(function(value, key) {
            contactObj[key] = value;
        });

        let contactJson = JSON.stringify(contactObj);

        contactRequest.send(contactJson);

        contactRequest.addEventListener('readystatechange', function() {
            if(contactRequest.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            } else if(contactRequest.readyState === 4 && contactRequest.status == 200) {
                statusMessage.innerHTML = message.success;
            } else {
                statusMessage.innerHTML = message.failure;
            }
        });

        for(let i = 0; i < contactInput.length; i++) {
            contactInput[i].value = '';
        }
        
    });
    //Slider
    
    let sliderIndex = 1,
        slides = document.querySelectorAll('.slider-item'),
        prev = document.querySelector('.prev'),
        next = document.querySelector('.next'),
        dotsWrap = document.querySelector('.slider-dots'),
        dots = document.querySelectorAll('.dot');

    showSlides(sliderIndex);

    function showSlides(n) {
        
        if (n > slides.length) {
            sliderIndex = 1;
        }

        if (n < 1) {
            sliderIndex = slides.length;
        }

        slides.forEach((item) => item.style.display = 'none');

        dots.forEach((item) => item.classList.remove('dot-active'));

        slides[sliderIndex - 1].style.display = 'block';
        dots[sliderIndex - 1].classList.add('dot-active');
    }

    function plusSlide(n) {
        showSlides(sliderIndex += n);
    }

    function currentSlide(n) {
        showSlides(sliderIndex = n);
    }

    prev.addEventListener('click', function() {
        plusSlide(-1);
    })

    next.addEventListener('click', function() {
        plusSlide(1);
    })

    dotsWrap.addEventListener('click', function(event) {
        for(i = 0; i < dots.length; i++) {
            if (event.target == dots[i]) {
                currentSlide(i + 1);
            }
        }
    })


})