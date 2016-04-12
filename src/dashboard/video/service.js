'use strict';

export default class VideoService {
    constructor(api) {
        this.api = api;
    }

    getVideos(page, perPage, tags) {
        return this.api.get('/posts/video',{
            params: {
                page: page,
                per_page: perPage,
                tag_list: tags
            }
        }).then((res) => {
            return res.data;
        })
    }

    getVideoById(id) {
        return this.api.get(`/posts/video/${id}`).then((res) => {
            return res.data;
        });
    }
}
