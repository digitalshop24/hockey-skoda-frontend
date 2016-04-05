'use strict';

export default class PrizenewService {
    constructor(api) {
        this.api = api;
    }

    getPrizes() {
        return this.api.get('/prizes').then((res) => {
            return res.data;
        });
    }
}
