'use strict';

const lastQuestionIndex = 42;

export default class SupergameCtrl {
    constructor(supergameService, $interval) {
        this.supergameService = supergameService;
        this.$interval = $interval;
        this.answers = [];
        this.questionIndex = 1;
    }


    startQuiz() {
        this.getNextQuestion();
    }

    getNextQuestion() {
        this.closeQuestionModal();
        if(this.currentAnswer) {
            this.supergameService.checkQuestion(this.userAnswerId, this.currentAnswer).then(res => {
                this.retrieveNextQuestion();
            })
        } else {
            this.retrieveNextQuestion();
        }
    }

    retrieveNextQuestion() {
        this.$interval.cancel(this.timeInterval);
        this.supergameService.getNextQuestion().then(res => {
            this.questionIndex = res.question_number;
            this.userAnswerId = res.answer_id;
            this.question = res.question;
            this.isTimeOver = false;
            this.openQuestionModal();
            this.availableTime = 20;

            this.timeInterval = this.$interval(() => {
                this.availableTime -= 1;
                if (this.availableTime <= 0) {
                    this.isTimeOver = true;
                    this.$interval.cancel(this.timeInterval);
                }
            }, 1000);
        });
    }

    openQuestionModal() {
        $('#question').modal('show');
    }

    closeQuestionModal() {
        $('#question').modal('hide');
    }
}