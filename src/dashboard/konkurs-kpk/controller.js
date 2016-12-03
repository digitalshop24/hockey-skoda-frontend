'use strict';

const QUIZ_SIZE = 20;

export default class KonkurskpkCtrl {
    constructor($state, login, session, konkurskpkService, modalSpeed, modal, $interval) {
        this.state = $state;
        this.login = login;
        this.session = session;
        this.user = session.user;
        this.service = konkurskpkService;
        this.modalSpeed = modalSpeed;
        this.modal = modal;
        this.$interval = $interval;
        this.questionTime = 15;
    }

    getPrizes() {
        this.categories = [];
        this.service.getPrizes().then((res) => {
            this.prizes = res.prizes;
            res.prizes.forEach(prize => {
                if (prize.prize_category) {
                    if (this.categories.find(category =>category.name == prize.prize_category.name)) {
                        const category = this.categories.find(category =>category.name == prize.prize_category.name);
                        category.prizes.push(prize);
                    } else {
                        this.categories.push({
                            name: prize.prize_category.name,
                            right_answers_count: prize.prize_category.right_answers_count,
                            prizes: [prize]
                        })
                    }
                }
            });
            this.categories[0].right_answers_count = '0-9'
            this.categories[1].right_answers_count = '10-14'
            this.categories[2].right_answers_count = '15-18'
            this.categories[3].right_answers_count = '19-20'
            $('#myModal').modal('show');
        });
    }

    startFirstQuestion() {
        this.firstQuestionTime = this.questionTime;
        this.firstInterval = this.$interval(() => {
            this.firstQuestionTime -= 1;
            if (this.firstQuestionTime <= 0) {
                console.log(this.firstQuestionTime);
                this.$interval.cancel(this.firstInterval);
            }
        }, 1000);
    }

    startQuiz() {
        if (this.busy) return;
        this.busy = true; 
        $('#myModal').modal('hide');
        
        var text = '<p>Добрый день! Повторное участие в Викторине невозможно. Но у Вас все еще есть шанс выиграть главный приз – билеты на хоккей! Более подробную информацию можно получить по <a  href="/profile/fotocontest"> ссылке</a> .</p>';
        this.service.startQuiz(this.prizes).
            then((res) => {
                this.busy = false;
                this.quizId = res.id;
                this.questions = res.questions;
                this.currentQuestionIndex = 0;
                this.currentQuestion = this.questions[this.currentQuestionIndex];
                this.showQuiz = true;
                this.answers = {};
                $('#questionsModal').modal('show');
                this.startFirstQuestion();
            }).catch(err => {
                this.modal.open({
                    resolve: {
                        message: () => {
                            return text || 'Ошибка!';
                        }
                    }
                });
            });
    }
    nextQuestion() {
        this.currentQuestionIndex++;
        this.currentQuestion = this.questions[this.currentQuestionIndex];
        if (this.currentQuestionIndex + 1 == QUIZ_SIZE) {
            this.isLastQuestion = true;
        }
        this.$interval.cancel(this.firstInterval);
        this.startFirstQuestion();
    }

    checkAnswers() {
        $('#questionsModal').modal('hide');
        const resultAnswers = [];
        for (let i = 0; i < QUIZ_SIZE; i++) {
            resultAnswers.push(this.answers[i] ? this.answers[i] : '');
        }
        this.service.checkQuiz(this.quizId, resultAnswers).then(res => {
            this.showQuiz = false;
            this.showQuizAnswers = true;
            this.quizResult = res;
            this.user.can_kpk_victorin = false;
            this.session.user = this.user;
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