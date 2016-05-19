'use strict';


export default class ProgressCtrl {
    constructor(achievements, moment, modalSpeed, user, progressService) {
        this.achievements = achievements;
        this.achievements.forEach((achievement) => {
            achievement.max_points = achievement.max_points || '&#8734;'; // infinity sign
            achievement.percentage = achievement.has_maximum ?
                Math.round((achievement.current_points / achievement.max_points) * 100) : 66;
            achievement.progressBarPercentage = 100 - achievement.percentage;
            achievement.currentBallAmount = achievement.current_points;
        });
        this.today = moment().format('DD MMMM');
        this.modalSpeed = modalSpeed;
        this.user = user;
        this.progressService = progressService;
    }

    resendEmail() {
        this.progressService.resendEmail();
    }

    openSpeed() {
        if(localStorage["modalSpeedProfile"] == null){
            localStorage["modalSpeedProfile"] = "showed";
            this.modalSpeed.open({
                resolve: {
                    message: () => {
                      var header = 'Личный кабинет';
                      var text = 'В личном кабинете отображается вся ваша активность на сайте.';
                      var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                      return message;
                    }
                },
                windowClass: 'modal-window modal-window_right',
            });
            return;
        }
    }
}