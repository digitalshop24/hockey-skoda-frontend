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

    chooseDealer(id) {
        return this.api.put('/users/my_prizes', {
            skoda_id: id
        }).then((res) => {
            return res.data;
        });
    }

}
