'use strict';

export default class SocialService {
    constructor(api, $http) {
        this.api = api;
        this.http = $http;
    }

    getPosts(page, days) {
        return this.api.get('/soc_posts', {
            params: {
                page: page,
                days: days
            }
        }).then(res => {
            return res.data;
        });
    }
}
