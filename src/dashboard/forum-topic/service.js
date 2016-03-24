'use strict';

import TopicUser from  '../topicUser.js'


export default class ForumtopicService {
    constructor(api) {
        this.api = api;
    }

    getTopic(id) {
        return this.api.get(`/forum/topics/${id}`).then((res) => {
            res.data.last_active_user = Object.assign(new TopicUser(), res.data.last_message.user);
            return res.data;
        })
    }

    getTopicMessages(id, page, perPage) {
        return this.api.get(`/forum/topics/${id}/messages`, {
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            res.data.messages.forEach((message) => {
                message.user = Object.assign(new TopicUser(), message.user);
            });
            return res.data;
        })
    }

    sendMessage(id, message) {
        return this.api.post(`/forum/topics/${id}/messages`, {
            message: message
        }).then((res) => {
            return res.data;
        })
    }
}
