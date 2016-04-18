'use strict';

export default class PhotocontestService {
    constructor(api) {
        this.api = api;
    }

    loadImage(image) {
        return this.api.post('/users/photo_game', {
            image: image
        }).then((res) => {
            return res.data;
        });
    }

    getMyPhotos() {
        return this.api.get('/users/photo_game').then((res) => {
            return res.data;
        });
    }
}
