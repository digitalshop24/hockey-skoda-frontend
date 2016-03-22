'use strict';

export default class ForumService {
    constructor(api) {
        this.api = api;
    }

    getSections(page, sectionAmount, topicAmount) {
        return this.api.get('/forum/sections', {
            params: {
                page: page,
                topic_number: topicAmount,
                per_page: sectionAmount
            }
        }).then(res=> {
            return res.data;
        })
    }
}
