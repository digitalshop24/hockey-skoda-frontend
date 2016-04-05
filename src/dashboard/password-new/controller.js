'use strict';


export default class PasswordnewCtrl {
    constructor(passwordnewService, token, modal) {
        this.service = passwordnewService;
        this.token = token;
        this.modal = modal;
    }

    changePassword() {
        if (this.password != this.confirmPassword) {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Введенные пароли не совпадают!'
                    }
                }
            });
            return;
        }
        this.service.changePassword(this.token, this.password).
            then((res)=>{
                this.password = "";
                this.confirmPassword = "";
                this.modal.open({
                    resolve: {
                        message: () => {
                            return 'Пароль успешно изменен!</h4>'
                        }
                    }
                });
            }).catch((err) => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Произошла ошибка. Пароль не был изменен!</h4>'
                        }
                    }
                });
            });
    }
}