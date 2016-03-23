'use strict';

export default class BlogService {
    constructor(api) {
        this.api = api;
    }

    getBlogs(page, perPage) {
        return this.api.get('/posts/blog',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })
    }
}
