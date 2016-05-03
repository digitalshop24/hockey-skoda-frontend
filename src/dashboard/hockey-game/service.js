'use strict';

export default class HockeyGameService {
    constructor(api) {
        this.api = api;
    }

    getAchieve() {
        this.api.post('/users/play_hockey_game');
    }

    getAchieveFor2Minutes() {
        this.api.post('/users/two_min_game');
    }
}
