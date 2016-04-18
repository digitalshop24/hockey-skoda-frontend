'use strict';


export default class ProgressCtrl {
    constructor(photocontestService, Upload, api, $state, modal, photos) {
        this.service = photocontestService;
        this.Upload = Upload;
        this.api = api;
        this.state = $state;
        this.modal = modal;
        this.photos = photos;
    }



    loadPhoto(file) {
        if(file) {
            this.Upload.dataUrl(file, true).then((dataUrl) => {
                return this.service.loadImage(dataUrl)
            }).then(res => {
                this.state.go('dashboard.profile.fotocontest', {}, {reload: true});
            }).catch(err => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return 'Во время загрузки произошла ошибка!';
                        }
                    }
                });
            });
        } else {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Файл не соответствует формату!';
                    }
                }
            });
        }

    }
}