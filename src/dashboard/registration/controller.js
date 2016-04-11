'use strict';


export default class RegistrationCtrl {
    constructor(auth, modal, profileService, $state, brands, skodaCars) {
        this.auth = auth;
        this.brands = brands;
        this.skodaCars = skodaCars;
        this.modal = modal;
        this.profileService = profileService;
        this.state = $state;
    }

    checkIfSkoda() {
        this.isCurrentCarSkoda = this.form.current_car == 'Skoda';
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
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Во время регистрации произошла ошибка!';
                        }
                    }
                });

            });
    }
}