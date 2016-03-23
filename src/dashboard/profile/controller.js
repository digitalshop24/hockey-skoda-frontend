'use strict';


export default class ProfileCtrl {
    constructor(achievements, lastAchievements) {
        this.lastAchievements = lastAchievements;
        this.achievements = achievements;
        this.achievements.forEach((achievement) => {
            achievement.max_points = achievement.max_points || 10;
            achievement.percentage = Math.round((achievement.current_points / achievement.max_points) * 100);
            achievement.progressBarPercentage = 100 - achievement.percentage;
        })
    }
}