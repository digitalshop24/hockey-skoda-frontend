'use strict';

const TEST_SIZE = 5;

export default class HockeyTestCtrl {
    constructor($scope, hockeyTestService, modal, forumService, modalSpeed, $state) {
        this.modal = modal;
        this.state = $state;
        this.scope = $scope;
        this.modalSpeed = modalSpeed;
        this.service = hockeyTestService;
        this.form = {};
        this.data = {};
    }

    startTest() {
        this.service.startTest(
        						this.form.height, this.form.weight,
         						this.form.chest_length, this.form.waist_length
         	).then((res) => {
                this.testId = res.id;
                this.questions = res.questions;
                this.currentQuestionIndex = 0;
                this.currentQuestion = this.questions[this.currentQuestionIndex];
                this.showTest = true;
                this.answers = {};
            }).catch(err => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return err.message || 'Ошибка!';
                        }
                    }
                });
            });
    }

    nextQuestion() {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        if (this.currentQuestionIndex + 1 == TEST_SIZE) {
            this.isLastQuestion = true;
        }
    }

    checkAnswers() {
        const resultAnswers = [];
        const questionIds = [];
        for (let i = 0; i < TEST_SIZE; i++) {
            resultAnswers.push(this.answers[i] ? this.answers[i] : '');
            questionIds.push(this.questions[i].id);
        }
        this.service.checkTest(this.testId, resultAnswers, questionIds).then(res => {
            this.showTest = false;
            this.showTestAnswers = true;
            this.testResult = res.result;
            this.data.title = "Ваше имя в NHL " + res.result.title;
            this.data.description = res.result.body;
            this.data.picture = res.result.image.small;
            this.data.imgUrl = res.result.image.small;

            // this.session.user = this.user;
        }).catch(err => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return err.message || 'Ошибка!';
                    }
                }
            });
        });

    }


}