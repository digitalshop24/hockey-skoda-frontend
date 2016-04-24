'use strict';


export default class ProgressCtrl {
    constructor(photocontestService, Upload, api, $state, modal, photos, user, $rootScope) {
        this.service = photocontestService;
        this.Upload = Upload;
        this.api = api;
        this.user = user;
        this.state = $state;
        this.modal = modal;
        this.photos = photos;
        this.$rootScope = $rootScope;
        this.isUserPaticipating = !!this.photos.find(photo => photo.is_published);
        this.photos.forEach(photo => {
            photo.statusText = photo.is_published ? 'Активна' : this.isUserPaticipating ? 'Неактивна' : 'Участвовать';
        })
    }


    loadPhoto(file) {
        if (file) {
            this.Upload.dataUrl(file, true).then((dataUrl) => {
                return this.service.loadImage(dataUrl)
            }).then(res => {
                this.state.go('dashboard.profile.fotocontest', {}, {reload: true});
            }).catch(err => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Во время загрузки произошла ошибка!';
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

    participateInContest(photo) {
        this.service.sharePhoto(photo.id)
            .then(res => {
                photo.is_published = true;
                photo.isUserPaticipating = true;
                this.$rootScope.$broadcast('profile:fotocontest', {
                    url: photo.image.original
                });
                $('#share').modal('show');
            }).catch(err => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return 'Произошла ошибка!';
                        }
                    }
                });
            });
    }

    deletePhoto(photo) {
        this.service.deleteImage(photo.id)
            .then(res => {
                this.state.go('dashboard.profile.fotocontest', {}, {reload: true});
            }).catch(err => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return 'Во время удаления произошла ошибка!';
                        }
                    }
                });
            });
    }
}