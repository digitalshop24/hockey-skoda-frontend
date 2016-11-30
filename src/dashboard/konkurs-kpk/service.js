'use strict';

export default class konkurskpkService {
    constructor(api) {
        this.api = api;
    }

    getPrizes() {
        return this.api.get('/kpk_victorina/prizes', {}).then(res => {
            return res.data;
        })
    }

    startQuiz(prizes) {
        return this.api.post('/kpk_victorina/start', {
            prize_0_id: prizes[0].id,
            prize_1_id: prizes[1].id,
            prize_2_id: prizes[2].id,
            prize_3_id: prizes[3].id
        }).then(res=> {
            return res.data;
        }).catch(err => {
            throw err.data;
        });
    }

    checkQuiz(id, answers) {
        return this.api.post(`/kpk_victorina/${id}/answer`, {
            answers: answers
        }).then(res=> {
            return res.data;
        }).catch(err => {
            throw err.data;
        });;
    }
}
