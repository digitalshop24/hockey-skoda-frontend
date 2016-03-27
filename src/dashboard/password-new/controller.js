'use strict';


export default class PasswordnewCtrl {
    constructor(passwordnewService, token, $modal) {
        this.service = passwordnewService;
        this.token = token;
        this.modal = $modal;
    }

    changePassword() {
        if (this.password != this.confirmPassword) {
            this.modal.open({
                template: '<div class="modal-body">Введенные пароли не совпадают!</div>'
            });
            return;
        }
        this.service.changePassword(this.token, this.password).
            then((res)=>{
                this.password = "";
                this.confirmPassword = "";
                this.modal.open({
                    template: '<div class="modal-body">Пароль успешно изменен!</div>'
                });
            }).catch((err) => {
                this.modal.open({
                    template: '<div class="modal-body">Произошла ошибка. Пароль не был изменен!</div>'
                });
            });
    }
}