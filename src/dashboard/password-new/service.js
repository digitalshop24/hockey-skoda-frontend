'use strict';

export default class Passwordnew {
    constructor(api) {
        this.api = api;
    }

    changePassword(token, password) {
        return this.api.put('/users/password', {
            reset_password_token: token,
            password: password,
            password_confirmation: password
        }).then((res) => {
            return res.data;
        }).catch(response => {
            throw response.data;
        });
    }
}
