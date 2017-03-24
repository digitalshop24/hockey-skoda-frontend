'use strict';

export default class FormaMasterClassService {
    constructor(api) {
        this.api = api;
    }

    getSchedule(stage) {
        return this.api.get('/schedule/index', {
            params: {
                stage: stage
            }
        })
        .then(response => {
            return response.data;
        });
    }
}
