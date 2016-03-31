'use strict';

export default class StarsService {
    constructor(api) {
        this.api = api;
    }

    getNews(page, perPage) {
        return this.api.get('/posts/stars',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })
    }
}
