'use strict';

export default class ModalCtrl {
    constructor($modalInstance, message){
        this.message = message;
        this.modalInstance = $modalInstance;
    }

    close() {
        this.modalInstance.close();
    }

}
