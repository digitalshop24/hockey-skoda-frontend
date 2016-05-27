'use strict';

const lastQuestionIndex = 42;
const lastSuperFinalQuestionIndex = 10;
const questionsPerTour = 7;
const secondsForAnswer = 20;
const timeBreakBetweenTours = 60;

export default class SupergameCtrl {
    constructor(supergameService, superFinalService, $interval, session) {
        this.supergameService = supergameService;
        this.superFinalService = superFinalService;
        this.user = session.user;
        this.$interval = $interval;
        this.answers = [];
        this.questionIndex = 1;
        this.currentTour = 1;
    }


    startQuiz() {
        this.isSuperFinal = false;
        this.getNextQuestion();
    }

    startNewTour() {
        this.$interval.cancel(this.timeBreakInterval);
        this.questionIndex++;
        this.closeTourModal();
        this.getNextQuestion();
    }

    getNextQuestion() {
        if(this.isSuperFinal) {
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

    startSuperfinalQuiz() {
        this.isSuperFinal = true;
        this.getSuperFinalNextQuestion();
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
                }
            }, 1000);
        });
    }

    isSuperFinalQuizFinished() {
        return this.questionIndex == lastSuperFinalQuestionIndex;
    }
}