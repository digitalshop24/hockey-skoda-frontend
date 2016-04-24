'use strict';


export default class ProfileCtrl {
    constructor(lastAchievements, profileService, user, hints, $scope) {
        this.service = profileService;
        this.lastAchievements = lastAchievements;
        this.user = user;
        this.hints = hints;


        // hack, because photocontest modal doesn't work at contained in fotocontest module
        this.shareData = {};
        $scope.$on('profile:fotocontest', (event, data) => {
            this.shareData.imgUrl = data.url;
        });
    }

    uploadAvatar(file) {
        this.service.uploadAvatar(file).then((res) => {
            this.user.avatar = res.user.avatar;
        });
    }
}