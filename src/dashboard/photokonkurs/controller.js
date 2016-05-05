'use strict';


export default class PhotocontestCtrl {
    constructor(photos, generalPhotocontestService, currentPage, perPage) {
        this.photos = photos;
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.service = generalPhotocontestService;
    }

    likePhoto(photo) {
        this.service.likePhoto(photo.id).then(res => {
            photo.liked_last_day = true;
            photo.likes++;
        });
    }

    loadMore() {
        if (this.busy) return;
        this.busy = true;

        this.service.getAllPhotos(++this.currentPage, this.perPage)
            .then((res) => {
                this.photos = this.photos.concat(res);
                this.busy = false;
            }).catch(err => {
                this.busy = false;
            });
    }
}