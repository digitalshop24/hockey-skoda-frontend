'use strict';

export default class RecoverService {
    constructor(api) {
        this.api = api;
    }

    recover(email) {
        return this.api.post('/users/password', {
            email: email
        }).then((res) => {
            return res.data;
        }).catch(response => {
            throw response.data;
        });
    }
}
