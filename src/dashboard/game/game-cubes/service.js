'use strict';

export default class CubesService {
    constructor(api) {
        this.api = api;
    }

    getSectorInfo(id) {
        return this.api.get(`/victorina/sections/${id}`).then(res => {
            return res.data;
        })
    }

    getPrizes() {
        return this.api.get('/victorina/prizes').then(res => {
            return res.data;
        })
    }

    startGame(cellId) {
        return this.api.post('/victorina/start', {
            cell_id: cellId
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err.data;
            });
    }

    checkAnswers(quizId, answers) {
        return this.api.post(`/victorina/${quizId}/answer`, {
            answers: answers
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err.data;
            });
    }

    confirmUserData(data) {
        return this.api.put('/victorina/user_info', data).then(res => {
            return res.data;
        })
    }
}
