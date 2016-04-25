'use strict';

export default class SocialService {
    constructor(api, $http) {
        this.api = api;
        this.http = $http;
    }

    getPosts(page, days, tags) {
        return this.api.get('/soc_posts', {
            params: {
                page: page,
                days: days,
                hashtag: tags
            } 
        }).then(res => {
            return res.data;
        });
    }
}
