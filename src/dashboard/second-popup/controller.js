'use strict';

export default class SecondPopupCtrl {
    constructor(session, $localStorage, mytestdriveService, $timeout, $state) {

        const prizePopap = $localStorage['prizePopap'];
       
        this.$state = $state;
        this.display = 'none';

        if (this.$state.includes('dashboard.prizenew')) {
                $localStorage['prizePopap'] = true;
                this.headerText = 'Стоимость супер-ячейки снижена до 750 баллов!';
                this.descrText = '';
                this.buttonText = 'Участвовать';
                this.goToState = 'dashboard.game.cubes';
                this.display = 'block';
                this.img = 'img/resources/img/modal-competition.jpg';
                this.imgstyle = "width:100%;"
            }, 10);
        }


    go() {
        this.display = 'none';
        this.$state.go(this.goToState);
    }

    close() {
        this.display = 'none';
    }
}
