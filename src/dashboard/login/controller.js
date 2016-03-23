'use strict';


export default class LoginCtrl {
    constructor(auth, $modal, message) {
        this.auth = auth;
        this.modal = $modal;
        if (message) {
            this.modal.open({
                template: '<div class="modal-body">' + message + '</div>'
            });
        }
    }

    send() {
        this.auth.login({
            email: this.form.email,
            password: this.form.password
        })
            .then(() => {
                this.form = {};
                this.modal.open({
                    template: '<div class="modal-body">Выполнен вход в аккаунт!</div>'
                });
            });
    }
}