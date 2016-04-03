'use strict';


export default class LoginCtrl {
    constructor($modalInstance, message, auth, $rootScope, $state, $auth) {
        this.message = message;
        this.modalInstance = $modalInstance;
        this.auth = auth;
        this.$auth = $auth;
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
                this.handleSuccessAuth();
            }).catch((err) => {
                this.rootscope.alreadyInLoginModal = false;
                this.message = err.error_code == 401 ? "Неверный логин или пароль" : "";
            });
    }

    authViaSocial(provider) {
        this.$auth.authenticate(provider)
            .then(res => {
                this.auth.initSession(res);
                this.handleSuccessAuth();
            })
            .catch(err => {
                this.message = "Проищошла ошибка авторизации";
            })
    }

    handleSuccessAuth() {
        this.form = {};
        this.rootscope.alreadyInLoginModal = false;
        this.close();
    }


    goToRegistration() {
        this.close();
        this.state.go('dashboard.registration');
    }

    recoverPassword() {
        this.close();
        this.state.go('dashboard.recover-password');
    }
}