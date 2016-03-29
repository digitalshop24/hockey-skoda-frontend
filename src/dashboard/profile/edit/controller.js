'use strict';


export default class ProgressCtrl {
    constructor(user, profileService, modal) {
        this.service = profileService;
        this.modal = modal;
        this.form = user;
    }

    update() {
        this.service.update(this.form).
            then(() => {
                this.form = {};
                this.modal.open({
                    resolve: {
                        message: () => {
                            return "Данные успешно обновлены"
                        }
                    }
                });
            })
            .catch((err) => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return "Во время обновления произошла ошибка!"
                        }
                    }
                });
            });
    }
}