'use strict';


export default class LoginCtrl {
    constructor($modalInstance, message, auth, $rootScope, $state){
        this.message = message;
        this.modalInstance = $modalInstance;
        this.auth = auth;
        this.rootscope = $rootScope;
        this.state = $state;
    }

    close() {
        this.modalInstance.close();
    }

    send() {
        this.rootscope.alreadyInLoginModal = true;
        this.auth.login({
            email: this.form.email,
            password: this.form.password
        })
            .then(() => {
                this.form = {};
                this.rootscope.alreadyInLoginModal = false;
            }).catch((err) => {
                this.rootscope.alreadyInLoginModal = false;
                this.message = err.error_code == 401 ? "Неверный логин или пароль" : "";
            });
    }

    goToRegistration() {
        this.close();
        this.state.go('dashboard.registration');
    }
}