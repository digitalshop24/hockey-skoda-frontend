'use strict';

export default class StartPopupCtrl {
    constructor(session, $localStorage, mytestdriveService, $timeout, $state) {

        const showRegPopup = $localStorage['regPopupWasShown'];
        const showTDrivePopup = $localStorage['tdrivePopupWasShown'];
        const konkursPopupWasShown = $localStorage['konkursPopupWasShown'];

        this.$state = $state;
        this.display = 'none';

        if (session.isAuthenticated) {

            mytestdriveService.getCoupon().then(coupon => {
                if (!coupon && !session.user.has_drive_request) {
                    $timeout(() => {
                        $localStorage['tdrivePopupWasShown'] = true;
                        this.headerText = 'Приглашаем ВАС На тест-драйв';
                        this.descrText = 'Это необходимо для того, чтобы участвовать в розыгрыше одного из трех автомобилей SKODA';
                        this.buttonText = 'Пройти тест-драйв';
                        this.goToState = 'dashboard.tdrive';
                        this.display = 'block';
                        this.img = 'img/resources/img/modal-competition.jpg';
                        this.imgstyle = "width:100%;"
                    }, 30 * 1000);
                }
                else {
                    if (!konkursPopupWasShown) {
                        $timeout(() => {
                            $localStorage['konkursPopupWasShown'] = true;
                            this.headerText = 'Творческий этап розыгрыша автомобиля ';
                            this.descrText = ' ';
                            this.buttonText = 'Перейти на страницу';
                            this.goToState = 'dashboard.forumtopic({id: 329, page: 1})';
                            this.display = 'block';
                            this.img = 'img/resources/img/slider_news_tvorche.png';
                            this.imgstyle = "width:75%; margin: 0 auto;"
                        }, 30 * 1000);
                    }
                }

            });

        } else {
            if (!showRegPopup) {
                $timeout(() => {
                    $localStorage['regPopupWasShown'] = true;
                    this.headerText = 'КАК ВЫИГРАТЬ автомобиль?';
                    this.descrText = 'Для начала Вам следует зарегистрироваться или войти в свой профиль.';
                    this.buttonText = 'Зарегистрироваться';
                    this.goToState = 'dashboard.registration';
                    this.display = 'block';
                    this.img = 'img/resources/img/modal-competition.jpg';
                    this.imgstyle = "width:100%;"
                }, 10 * 1000);
            }
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
