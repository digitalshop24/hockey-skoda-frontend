'use strict';

export default class FormaIgraService {
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
