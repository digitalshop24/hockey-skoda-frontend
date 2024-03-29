'use strict';

export default class PhotocontestService {
    constructor(api) {
        this.api = api;
    }

    loadImage(image) {
        return this.api.post('/photo_game_posts/my_photo_game', {
            image: image
        }).then((res) => {
            return res.data;
        });
    }

    sharePhoto(id) {
        return this.api.post('/photo_game_posts/shared', {
            photo_game_post_id: id
        }).then((res) => {
            return res.data;
        });
    }

    deleteImage(id) {
        return this.api.delete('/photo_game_posts/my_photo_game', {
            params: {
                photo_game_post_id: id
            }
        }).then((res) => {
            return res.data;
        });
    }

    getMyPhotos() {
        return this.api.get('/photo_game_posts/my_photo_game').then((res) => {
            return res.data;
        });
    }
}
