'use strict';


export default class RegistrationCtrl {
    constructor(auth, modal, profileService, $state) {
        this.auth = auth;
        this.modal = modal;
        this.profileService = profileService;
        this.state = $state;
    }

    send() {
        if (this.form.password != this.form.confirmPassword) {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Введенные пароли не совпадают!'
                    }
                }
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
            this.state.go('dashboard.registration-success');
        })
            .catch((err) => {
                let info = 'Во время регистрации произошла ошибка!';
                if (err.error_message.email) {
                    info = "Данный email уже существует"
                }
                this.modal.open({
                    resolve: {
                        message: () => {
                            return info;
                        }
                    }
                });

            });
    }
}