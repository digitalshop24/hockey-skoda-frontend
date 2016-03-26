'use strict';

export default class HeaderCtrl {
    constructor(login, session, $state, auth) {
        this.loginService = login;
        this.user = session.user;
        this.session = session;
        this.state = $state;
        this.auth = auth;
    }

    openLoginPopup() {
        this.loginService.open();
    }

    logout() {
        this.auth.logout().then(()=> {
            this.state.go('dashboard.main');
        });
    }
}
