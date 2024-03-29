'use strict';

export default class SecondPopupCtrl {
    constructor(session, $localStorage, $timeout, $state) {

        const prizePopup = $localStorage['prizePopup'];
        this.$state = $state;
        this.display = 'none';


        if (session.isAuthenticated && !prizePopup) {
            $timeout(() => {
                $localStorage['prizePopup'] = true;
                this.headerText = 'Стоимость супер-ячейки снижена до 750 баллов!';
                this.descrText = '';
                this.buttonText = 'Участвовать';
                this.goToState = 'dashboard.game.cubes';
                this.display = 'none';
                this.img = 'img/resources/img/modal-competition.jpg';
                this.imgstyle = "width:100%;"
            }, 10 * 1000);
        }
    }

    go() {
        this.display = 'none';
        this.$state.go(this.goToState);
    }

    close() {
        this.display = 'none';
    }
}
