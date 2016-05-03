'use strict';

export default class JuniorService {
    constructor(api) {
        this.api = api;
    }

    getGalleries() {
        return this.api.get('/galleries').then((res) => {
            return res.data;
        });
    }

}
