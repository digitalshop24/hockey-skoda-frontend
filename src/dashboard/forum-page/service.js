'use strict';

import config from '../../config.json';
import TopicUser from  '../topicUser.js'



export default class ForumpageService {
    constructor(api) {
        this.api = api;
    }

    getForumPage(id) {
        return this.api.get(`/forum/sections/${id}`).then((res) => {
            res.data.last_message.user = Object.assign(new TopicUser(), res.data.last_message.user);
            return res.data;
        })
    }

    getTopicsBySectionId(id, page, perPage, sort) {
        return this.api.get(`/forum/sections/${id}/topics`, {
            params: {
                page: page,
                per_page: perPage,
                sort: sort
            }
        }).then((res) => {
            res.data.topics.forEach((topic) => {
                const pagesAmount = Math.ceil(topic.messages_count / config.forum.messagesPerPage);
                topic.pages = Array.from(new Array(pagesAmount), (x, i) => i + 1);
            });
            return res.data;
        })
    }

    createTopic(sectionId, topicName, message) {
        return this.api.post(`/forum/sections/${sectionId}/topics`, {
            name: topicName,
            message: message
        }).then((res) => {
            return res.data;
        });
    }
}
