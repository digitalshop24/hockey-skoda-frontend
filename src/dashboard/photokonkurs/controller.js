'use strict';


export default class PhotocontestCtrl {
    constructor(photos, generalPhotocontestService, session, progressService, modal) {
        this.photos = photos;
        this.service = generalPhotocontestService;
        this.user = session.user;
        this.progressService = progressService;
        this.modal = modal;
    }

    resendEmail() {
        this.progressService.resendEmail().then(res => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Письмо отправлено!'
                    }
                }
            });
        }).catch(err => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Произошла ошибка!'
                    }
                }
            });
        });
    }

    likePhoto(photo) {
        if(this.user.confirmed_at) {
            this.service.likePhoto(photo.id).then(res => {
                photo.liked_last_day = true;
                photo.likes++;
            });
        } else {
            $('#myModal').modal('show');
        }

    }
}