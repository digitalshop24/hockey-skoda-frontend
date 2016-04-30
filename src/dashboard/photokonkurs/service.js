'use strict';

import TopicUser from  '../topicUser.js'


export default class PhotocontestService {
    constructor(api) {
        this.api = api;
    }

    getAllPhotos() {
        return this.api.get('/photo_game_posts').then((res) => {
            res.data.forEach((post) => {
                post.user = Object.assign(new TopicUser(), post.user);
            });
            return res.data;
        });
    }


    likePhoto(id) {
        return this.api.post('/photo_game_posts/like_dislike_post', {
            photo_game_post_id: id
        }).then((res) => {
            return res.data;
        });
    }
}
