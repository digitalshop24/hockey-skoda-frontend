'use strict';

export default class CheerService {
    constructor(api) {
        this.api = api;
    }


    getNews(page, perPage, tags) {
        return this.api.get('/posts/girls', {
            params: {
                page: page,
                per_page: perPage,
                tag_list: tags
            }
        }).then(response => {
            return response.data;
        }).catch(response => {
            throw response.data.error;
        });
    }
}
