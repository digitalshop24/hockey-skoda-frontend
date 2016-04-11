'use strict';


export default class ProfileCtrl {
    constructor(lastAchievements, profileService, user, hints) {
        this.service = profileService;
        this.lastAchievements = lastAchievements;
        this.user = user;
        this.hints = hints;
    }

    uploadAvatar(file) {
        this.service.uploadAvatar(file).then((res) => {
            this.user.avatar = res.user.avatar;
        });
    }
}