'use strict';


export default class ProfileCtrl {
    constructor(achievements, lastAchievements, profileService, user) {
        this.service = profileService;
        this.lastAchievements = lastAchievements;
        this.achievements = achievements;
        this.achievements.forEach((achievement) => {
            achievement.max_points = achievement.max_points || '&#8734;'; // infinity sign
            achievement.percentage = achievement.has_maximum ?
                Math.round((achievement.current_points / achievement.max_points) * 100) : 66;
            achievement.progressBarPercentage = 100 - achievement.percentage;
            achievement.currentBallAmount = achievement.current_points;
        });
        this.user = user;
    }

    uploadAvatar(file) {
        this.service.uploadAvatar(file).then((res) => {
            this.user.avatar = res.user.avatar;
        });
    }
}