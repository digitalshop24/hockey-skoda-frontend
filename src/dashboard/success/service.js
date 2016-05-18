'use strict';

export default class RegsuccessService {
    constructor(api) {
        this.api = api;
    }

    confirm(token) {
        return this.api.post('/users/confirm_email', {
            confirmation_token: token
        }).then(res => {
            return res.data;
        });
    }
}
