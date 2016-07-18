'use strict';

export default class HockeyTestService {
    constructor(api) {
        this.api = api;
    }

    startTest(height, weight, chest_length, waist_length) {
        return this.api.post('/hockey_test/start', {
            height: height,
            weight: weight, 
            chest_length: chest_length,
            waist_length: waist_length
        }).then((res) => {
            return res.data;
        }).catch(err => {
            throw err.data;
        });
    }

    checkTest(id, answers, question_ids) {
        return this.api.post(`/hockey_test/answer`, {
            test_id: id,
            answers: answers,
            question_ids: question_ids
        }).then(res=> {
            return res.data;
        }).catch(err => {
            throw err.data;
        });;
    }
}
