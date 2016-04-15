'use strict';

export default class ModalCtrl {
    constructor($modalInstance, data, shareService, session) {
        this.data = data;
        this.modalInstance = $modalInstance;
        this.shareService = shareService;
        this.session = session;
    }

    close() {
        this.modalInstance.close();
    }

    tryShare() {
        if (this.session.isAuthenticated) {
            this.shareService.shareAttempt(this.data.type);
        }
    }

}
