'use strict';

export default class ForumpageService {
    constructor(api) {
        this.api = api;
    }

    getForumPage(id) {

    }

    getTopicsBySectionId(id, page, perPage) {
        return this.api.get(`/forum/sections/${id}/topics`,{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })
    }
}
