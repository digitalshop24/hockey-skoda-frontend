'use strict';

export default class PrizesService {
    constructor(api) {
        this.api = api;
    }

    getPrizes() {
        return this.api.get('/users/my_prizes').then((res) => {
            return res.data;
        });
    }

}
