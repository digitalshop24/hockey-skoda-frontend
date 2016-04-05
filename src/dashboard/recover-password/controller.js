'use strict';


export default class EmailnewCtrl {
    constructor(recoverService, modal) {
        this.service = recoverService;
        this.modal = modal;
    }

    recover() {
        this.service.recover(this.email).
            then((res) => {
                this.email = "";
                this.modal.open({
                    resolve: {
                        message: () => {
                            return 'Запрос успешно отправлен!</h4>'
                        }
                    }
                });
            }).catch((err) => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Произошла ошибка. Запрос не был отправлен!</h4>'
                        }
                    }
                });
            });
    }
}