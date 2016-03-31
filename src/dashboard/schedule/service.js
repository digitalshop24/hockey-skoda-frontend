'use strict';

export default class ScheduleService {
    constructor(api) {
        this.api = api;
    }

    getSchedule() {
        return this.api.get('/schedule/index', {
            params: {}
        })
            .then(response => {
                return response.data;
            });
    }

    getTeams() {
        return this.api.get('/predictions/play_off').then(res=> {
            return res.data.teams;
        });
    }
}
