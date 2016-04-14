'use strict';

export default class ShareCtrl {
    constructor(shareService, session) {
        this.shareService = shareService;
        this.session = session;
        this.data.url = this.data.url ? this.data.url : this.data.imgUrl;
    }

    tryShare() {
        if (this.session.isAuthenticated) {
            this.shareService.shareAttempt(this.data.type);
        }
    }
}
