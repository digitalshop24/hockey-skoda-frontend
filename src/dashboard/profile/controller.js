'use strict';

const lastQuestionIndex = 42;
const lastSuperFinalQuestionIndex = 10;
const questionsPerTour = 7;
const secondsForAnswer = 20;
const timeBreakBetweenTours = 60;


export default class ProfileCtrl {
    constructor(lastAchievements, profileService, user, hints, $scope, supergameService, superFinalService, $interval) {
        this.service = profileService;
        this.lastAchievements = lastAchievements;
        this.user = user;
        this.hints = hints;

        this.supergameService = supergameService;
        this.superFinalService = superFinalService;
        this.$interval = $interval;
        this.questionIndex = 1;
        this.currentTour = 1;


        // hack, because photocontest modal doesn't work at contained in fotocontest module
        this.shareData = {};
        $scope.$on('profile:fotocontest', (event, data) => {
            this.shareData = data;
        });


        $scope.$on('profile:supergame', (event, data) => {
            if (data.isSuperFinal) {
                this.startSuperfinalQuiz();
            } else {
                this.startQuiz();
            }
        });
    }

    uploadAvatar(file) {
        this.service.uploadAvatar(file).then((res) => {
            this.user.avatar = res.user.avatar;
        });
    }


    startQuiz() {
        this.isSuperFinal = false;
        this.getNextQuestion();
    }

    startSuperfinalQuiz() {
        this.isSuperFinal = true;
        this.getSuperFinalNextQuestion();
    }

    startNewTour() {
        this.$interval.cancel(this.timeBreakInterval);
        this.questionIndex++;
        this.closeTourModal();
        this.getNextQuestion();
    }

    getNextQuestion() {
        if (this.isSuperFinal) {
            this.getSuperFinalNextQuestion();
            return;
        }

        if (this.isQuizFinished()) {
            this.supergameService.checkQuestion(this.userAnswerId, this.currentAnswer).then(res => {
                this.closeQuestionModal();
                this.openQuizResults();
            });

        } else if (this.isTourFinished()) {
            this.closeQuestionModal();
            this.currentTour = this.questionIndex / questionsPerTour;
            this.timeBreak = timeBreakBetweenTours;
            this.openTourModal();

            this.timeBreakInterval = this.$interval(() => {
                this.timeBreak -= 1;
                if (this.timeBreak <= 0) {
                    this.startNewTour();
                }
            }, 1000);
        } else {
            if (this.currentAnswer) {
                this.supergameService.checkQuestion(this.userAnswerId, this.currentAnswer).then(res => {
                    this.retrieveNextQuestion();
                })
            } else {
                this.retrieveNextQuestion();
            }
        }

    }

    isQuizFinished() {
        return this.questionIndex == lastQuestionIndex;
    }

    isTourFinished() {
        return this.questionIndex % questionsPerTour == 0;
    }

    retrieveNextQuestion() {
        this.$interval.cancel(this.timeInterval);
        this.supergameService.getNextQuestion().then(res => {
            this.questionIndex = res.question_number;
            this.userAnswerId = res.answer_id;
            this.question = res.question;
            this.isTimeOver = false;
            this.openQuestionModal();
            this.availableTime = secondsForAnswer;

            this.timeInterval = this.$interval(() => {
                this.availableTime -= 1;
                if (this.availableTime <= 0) {
                    this.isTimeOver = true;
                    this.$interval.cancel(this.timeInterval);
                    this.getNextQuestion();
                }
            }, 1000);
        });
    }

    openQuizResults() {
        $('#results').modal('show');
    }

    openTourModal() {
        $('#tour').modal('show');
    }

    closeTourModal() {
        $('#tour').modal('hide');
    }

    openQuestionModal() {
        $('#question').modal('show');
    }

    closeQuestionModal() {
        $('#question').modal('hide');
    }


    getSuperFinalNextQuestion() {

        if (this.isSuperFinalQuizFinished()) {
            this.superFinalService.checkQuestion(this.userAnswerId, this.currentAnswer).then(res => {
                this.closeQuestionModal();
                this.openQuizResults();
            });

        } else {
            if (this.currentAnswer) {
                this.superFinalService.checkQuestion(this.userAnswerId, this.currentAnswer).then(res => {
                    this.retrieveSuperfinalNextQuestion();
                })
            } else {
                this.retrieveSuperfinalNextQuestion();
            }
        }
    }


    retrieveSuperfinalNextQuestion() {
        this.$interval.cancel(this.timeInterval);
        this.superFinalService.getNextQuestion().then(res => {
            this.questionIndex = res.question_number;
            this.userAnswerId = res.answer_id;
            this.question = res.question;
            this.isTimeOver = false;
            this.openQuestionModal();
            this.availableTime = secondsForAnswer;

            this.timeInterval = this.$interval(() => {
                this.availableTime -= 1;
                if (this.availableTime <= 0) {
                    this.isTimeOver = true;
                    this.$interval.cancel(this.timeInterval);
                    this.getSuperFinalNextQuestion();
                }
            }, 1000);
        });
    }

    isSuperFinalQuizFinished() {
        return this.questionIndex == lastSuperFinalQuestionIndex;
    }

}