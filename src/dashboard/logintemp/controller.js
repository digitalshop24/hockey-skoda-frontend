'use strict';


export default class LoginCtrl {
    constructor($modalInstance, message, auth){
        this.message = message;
        this.modalInstance = $modalInstance;
        this.auth = auth;
    }

    send() {
        this.auth.login({
            email: this.form.email,
            password: this.form.password
        })
            .then(() => {
                this.form = {};
            }).catch((err) => {
                this.message = "Ошибка";
            });
    }
}