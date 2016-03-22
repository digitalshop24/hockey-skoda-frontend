'use strict';

export default class MainService {
    constructor(api) {
        this.api = api;
    }

    getLightingNews(amount) {
        return this.api.get("/posts/news/lighting", {
            params: {
                number: amount
            }
        }).then((res) => {
            return res.data;
        })
    }
}
