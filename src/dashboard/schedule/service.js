'use strict';

export default class ScheduleService {
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

    getTeams() {
        return this.api.get('/teams').then(res=> {
            return res.data;
        });
    }
}
