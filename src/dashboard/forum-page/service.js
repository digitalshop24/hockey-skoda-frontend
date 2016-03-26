'use strict';
import config from '../../config.json';


export default class ForumpageService {
    constructor(api) {
        this.api = api;
    }

    getForumPage(id) {
        return this.api.get(`/forum/sections/${id}`, {
            params: {}
        }).then((res) => {
            return res.data;
        })
    }

    getTopicsBySectionId(id, page, perPage) {
        return this.api.get(`/forum/sections/${id}/topics`, {
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            res.data.topics.forEach((topic) => {
                const pagesAmount = Math.ceil(topic.messages_count / config.forum.messagesPerPage);
                topic.pages = Array.from(new Array(pagesAmount), (x, i) => i + 1);
            });
            return res.data;
        })
    }
}
