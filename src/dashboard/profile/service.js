'use strict';

import User from '../../auth/user.js';

export default class ProfileService {
    constructor(api, Upload) {
        this.api = api;
        this.Upload = Upload;
    }

    getCurrentUser() {
        return this.api.get('/users/current').then((res) => {
            res.data = Object.assign(new User(), res.data);
            return res.data;
        });
    }

    update(data) {
        return this.api.put('/users/edit', data).then((res) => {
            return res.data;
        });
    }

    getAchievements() {
        return this.api.get('/users/achievments/progress').then((res) => {
            return res.data;
        });
    }

    getLastAchievements() {
        return this.api.get('/users/achievments').then((res) => {
            return res.data;
        });
    }

    uploadAvatar(file) {

        return this.Upload.upload({
            url: this.api.url + '/users/edit',
            method: 'PUT',
            headers: this.api.headers,
            data: {"avatar": file}
        }).then((res) => {
            return res.data;
        });

    }
}
