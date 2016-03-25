'use strict';

import TopicUser from  '../topicUser.js'

export default class BlogService {
    constructor(api) {
        this.api = api;
    }

    getBlogs(page, perPage, tags) {
        return this.api.get('/posts/blog',{
            params: {
                page: page,
                per_page: perPage,
                tag_list: tags
            }
        }).then((res) => {
            res.data.posts.forEach((blog) => {
                blog.user = Object.assign(new TopicUser(), blog.user);
            });
            return res.data;
        })
    }
}
