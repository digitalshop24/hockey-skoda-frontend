'use strict';

export default class TantamareskaService {
    constructor(api) {
        this.api = api;
    }

    loadImage(image) {
        return this.api.post('/images', {
            image: image
        }).then((res) => {
            return res.data;
        });
    }
}
