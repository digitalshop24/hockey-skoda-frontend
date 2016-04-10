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
                $('#password').css('border-color', 'red');
                this.form.password = undefined;
                this.rootscope.alreadyInLoginModal = false;
                this.message = err.message || "Произошла ошибка авторизации";
            });
    }

    authViaSocial(provider) {
        this.$auth.authenticate(provider)
            .then(res => {
                this.auth.initSession(res);
                this.handleSuccessAuth();
            })
            .catch(err => {
                this.message = "Произошла ошибка авторизации";
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