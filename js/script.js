window.addEventListener('DOMContentLoaded', function() {
    let infoTabContent = document.querySelectorAll('.info-tabcontent'),
        infoHeaderTab = document.querySelectorAll('.info-header-tab'),
        info = document.querySelector('.info');
    
    function manageContent(contentMassive, TabsMassive, parent){
    
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
            }
        })
    }
    manageContent(infoTabContent, infoHeaderTab, info);
})