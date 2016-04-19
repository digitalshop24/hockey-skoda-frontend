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

    getPrizes(id) {
        return this.api.get('/victorina/prizes', {
            params: {
                cell_id: id
            }
        }).then(res => {
            return res.data;
        })
    }

    startGame(cellId, prizes) {
        return this.api.post('/victorina/start', {
            cell_id: cellId,
            prize_0_id: prizes[0],
            prize_1_id: prizes[1],
            prize_2_id: prizes[2],
            prize_3_id: prizes[3]
        })
            .then(res => {
                return res.data;
            })
            .catch(err => {
                throw err.data;
            });
    }

    startUSPGame(firstVictorinaId) {
        return this.api.post('/victorina/start/usp', {
            victorina_id: firstVictorinaId
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
