'use strict';


export default class RegistrationCtrl {
    constructor(auth, modal, profileService, $state, brands, skodaCars, user) {
        this.auth = auth;
        this.form = user;
        this.brands = brands;
        this.skodaCars = skodaCars;
        this.modal = modal;
        this.profileService = profileService;
        this.state = $state;
        this.checkIfSkoda();
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


        this.profileService.update(this.form)
            .then(() => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return 'Данные успешно обновлены!';
                        }
                    }
                });
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