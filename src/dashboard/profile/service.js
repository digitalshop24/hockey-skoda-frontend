'use strict';

export default class ProfileService {
    constructor(api) {
        this.api = api;
    }

    update(data) {
        return this.api.put('/users/edit',data).then((res) => {
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
}
