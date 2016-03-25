'use strict';

import TopicUser from  '../topicUser.js'


export default class FactsService {
    constructor(api) {
        this.api = api;
    }

    getFacts(page, perPage) {
        return this.api.get('/posts/interesting_facts',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            res.data.posts.forEach((fact) => {
                fact.user = Object.assign(new TopicUser(), fact.user);
            });
            return res.data;
        })
    }
}
