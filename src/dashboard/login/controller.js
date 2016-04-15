'use strict';


export default class LoginCtrl {
    constructor($modalInstance, message, auth, $rootScope, $state, $auth, api, SatellizerOauth) {
        this.message = message;
        this.modalInstance = $modalInstance;
        this.auth = auth;
        this.$auth = $auth;
        this.rootscope = $rootScope;
        this.state = $state;
        this.api = api;
        this.SatellizerOauth = SatellizerOauth;
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

    authViaTwitter() {
        this.api.post('/auth/twitter').then(res => {
            const url = res.data.url;
            this.SatellizerOauth.authenticate('customTwitter', {authorizationEndpoint: url}).then(function(oauthData) {
               var a = "";
            });
        });
    }

    handleSuccessAuth() {
        this.form = {};
        this.rootscope.alreadyInLoginModal = false;
        this.close();
        this.state.go(this.state.current, {}, {reload: true});
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