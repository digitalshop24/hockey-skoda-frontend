'use strict';


export default class RegistrationCtrl {
    constructor(auth, $modal) {
        this.auth = auth;
        this.modal = $modal;
    }

    send() {
        this.auth.register({
            email: this.form.email,
            password: this.form.password
        }).then((res) => {
            this.form = {};
            this.modal.open({
                template: '<div class="modal-body">Вы успешно зарегистрировались !</div>'
            });
        }).catch((err) => {
            this.modal.open({
                template: '<div class="modal-body">Во время регистрации произошла ошибка!</div>'
            });
        });
        console.log(this.form);
    }
}