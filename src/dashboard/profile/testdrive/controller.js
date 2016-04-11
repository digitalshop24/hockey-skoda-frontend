'use strict';


export default class MytestdriveCtrl {
    constructor(achievements) {
        this.achievements = achievements;
        this.achievements.forEach((achievement) => {
            achievement.max_points = achievement.max_points || '&#8734;'; // infinity sign
            achievement.percentage = achievement.has_maximum ?
                Math.round((achievement.current_points / achievement.max_points) * 100) : 66;
            achievement.progressBarPercentage = 100 - achievement.percentage;
            achievement.currentBallAmount = achievement.current_points;
        });
    }
}