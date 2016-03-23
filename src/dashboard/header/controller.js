'use strict';

export default class HeaderCtrl {
    constructor(login, session, $state) {
        this.loginService = login;
        this.user = session.user;
        this.session = session;
        this.state = $state;
    }

    openLoginPopup() {
        this.loginService.open();
    }
}
