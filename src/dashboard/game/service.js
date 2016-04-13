'use strict';

export default class GameService {
    constructor(api) {
        this.api = api;
    }

    getSectors() {
        return this.api.get('/victorina').then(res => {
            return res.data;
        })
    }
}
