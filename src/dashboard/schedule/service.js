'use strict';

export default class ScheduleService {
    constructor(api) {
        this.api = api;
    }

    getSchedule() {
        return this.api.get('/schedule/index', {
            params: {
                stage: 'currentAndFuture'
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
