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
    save(){
        var a  = document.createElement('a');
        var url = this.data.imgUrl;
        a.href = url;
        a.download = 'myTantam.png';
        a.click();
    }

}
