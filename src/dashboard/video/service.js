'use strict';

export default class VideoService {
    constructor(api) {
        this.api = api;
    }

    getVideos(page, perPage) {
        return this.api.get('/posts/video',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })
    }
}
