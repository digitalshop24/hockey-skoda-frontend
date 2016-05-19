'use strict';

export default class ProgressService {
    constructor(api) {
        this.api = api;
    }

    resendEmail() {
        return this.api.post('/users/resend_email').then((res) => {
            return res.data;
        });
    }
}
