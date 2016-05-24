'use strict';

export default class SupergameService {
    constructor(api) {
        this.api = api;
    }

    getNextQuestion() {
        return this.api.get('/quiz/final/question').then(res => {
            return res.data;
        });
    }

    checkQuestion(answerId, questionAnswerId) {
        return this.api.post('/quiz/final/question', {
            answer_id: answerId,
            answer: questionAnswerId
        }).then(res => {
            return res.data;
        });
    }
}
