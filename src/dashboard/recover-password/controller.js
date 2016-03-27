'use strict';


export default class EmailnewCtrl {
    constructor(recoverService, $modal) {
        this.service = recoverService;
        this.modal = $modal;
    }

    recover() {
        this.service.recover(this.email).
            then((res) => {
                this.email = "";
                this.modal.open({
                    template: '<div class="modal-body">Запрос успешно отправлен!</div>'
                });
            }).catch((err) => {
                this.modal.open({
                    template: '<div class="modal-body">Произошла ошибка. Запрос не был отправлен!</div>'
                });
            });
    }
}