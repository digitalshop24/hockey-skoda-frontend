'use strict';


export default class RegistrationCtrl {
    constructor(auth, $modal, profileService) {
        this.auth = auth;
        this.modal = $modal;
        this.profileService = profileService;
    }

    send() {
        if(this.form.password != this.form.confirmPassword) {
            this.modal.open({
                template: '<div class="modal-body">Введенные пароли не совпадают!</div>'
            });
            return;
        }
        this.auth.register({
            email: this.form.email,
            password: this.form.password
        }).then(() => {
            return this.profileService.update(this.form);
        }).then(() => {
            this.form = {};
            this.modal.open({
                template: '<div class="modal-body">Вы успешно зарегистрировались !</div>'
            });
        })
            .catch((err) => {
                let info = '';
                if (err.error_message.email) {
                    info = " Данный email уже существует."
                }
                this.modal.open({
                    template: '<div class="modal-body">Во время регистрации произошла ошибка!' + info + '</div>'
                });
            });
    }
}