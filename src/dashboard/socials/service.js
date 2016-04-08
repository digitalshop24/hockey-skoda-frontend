'use strict';

export default class SocialService {
    constructor(api) {
        this.api = api;
    }

    getPosts(page, perPage) {
        return this.api.get('/soc_posts',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })
    }
}
