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
    let deadLine = '2020-02-16';

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


})