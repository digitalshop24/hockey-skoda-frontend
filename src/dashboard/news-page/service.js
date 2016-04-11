'use strict';

import TopicUser from  '../topicUser.js'

export default class NewspageService {
    constructor(api) {
        this.api = api;
    }

    getNewsById(rubric, id) {
        return this.api.get(`/posts/${rubric}/${id}`).then((res) => {
            return res.data;
        });
    }

    getNews(rubric, page, perPage, origin) {
        return this.api.get(`/posts/${rubric}`, {
            params: {
                page: page,
                per_page: perPage,
                origin: origin
            }
        }).then((res) => {
            return res.data.posts;
        });
    }

    sendMessage(rubric, id, message) {
        return this.api.post(`/posts/${rubric}/${id}/comments`, {
            content: message
        }).then((res) => {
            return res.data;
        });
    }

    getComments(rubric, id, page, perPage) {
        return this.api.
            get(`/posts/${rubric}/${id}/comments`, {
                params: {
                    page: page,
                    per_page: perPage
                }
            }).then((res) => {
                res.data.comments.forEach((comment) => {
                    comment.user = Object.assign(new TopicUser(), comment.user);
                });
                return res.data;
            });
    }
}
