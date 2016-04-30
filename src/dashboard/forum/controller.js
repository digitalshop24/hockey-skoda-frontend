'use strict';

const QUIZ_SIZE = 20;

export default class ForumCtrl {
    constructor($state, sectionInfo, page, login, session, allSections, forumService, modalSpeed, modal) {
        this.sections = sectionInfo.sections;
        this.sections.forEach((section) => {
            const lastMessage = section.last_message;
            const name = (lastMessage.user.last_name || '') + ' ' + (lastMessage.user.first_name || '');
            section.lastActivityUserName = name;
            section.lastActivityTime = moment(lastMessage.created_at).format('MM.DD h:ss');
        });
        this.currentPage = page;
        this.totalPages = sectionInfo.total_pages;
        this.state = $state;
        this.login = login;
        this.allSections = allSections;
        this.session = session;
        this.user = session.user;
        this.service = forumService;
        this.modalSpeed = modalSpeed
        this.modal = modal
    }

    createTopic() {
        this.service.createTopic(this.section.id, this.topicName, this.message).
            then((res) => {
                this.state.go('dashboard.forum', {}, {
                    reload: true
                });
            });
    }

    startQuiz() {

        this.service.startQuiz().
            then((res) => {
                this.quizId = res.id;
                this.questions = res.questions;
                this.currentQuestionIndex = 0;
                this.currentQuestion = this.questions[this.currentQuestionIndex];
                this.showQuiz = true;
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
        if (this.currentQuestionIndex + 1 == QUIZ_SIZE) {
            this.isLastQuestion = true;
        }
    }

    checkAnswers() {
        const resultAnswers = [];
        for (let i = 0; i < QUIZ_SIZE; i++) {
            resultAnswers.push(this.answers[i] ? this.answers[i] : '');
        }
        this.service.checkQuiz(this.quizId, resultAnswers).then(res => {
            this.showQuiz = false;
            this.showQuizAnswers = true;
            this.quizResult = res;
            this.user.can_forum_victorin = false;
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

    openEditor() {
        this.isEditorOpen = !this.isEditorOpen;
    }

    loadMore() {
        this.state.go('dashboard.forum', {
            sections: this.sections,
            page: this.currentPage + 1,
            notScrollToTop: true
        });
    }

    openSpeed() {
        if (localStorage["modalSpeedForum"] == null) {
            localStorage["modalSpeedForum"] = "showed";
            this.modalSpeed.open({
                resolve: {
                    message: () => {
                        var header = 'Общайтесь и получайте баллы!';
                        var text = 'За сообщения на форуме вам полагаются баллы. Мы не приветствуем флуд или флейм. Поэтому баллы будут начислять не чаще, чем 1 раз каждые 3 часа. Будьте внимательны, не нарушайте правила форума!';
                        return '<h2>' + header + '</h2><p>' + text + '</p>';
                    }
                },
                windowClass: 'modal-window modal-window_right'
            });
        }
    }


}