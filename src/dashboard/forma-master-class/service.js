'use strict';

export default class FormaMasterClassService {
    constructor(api) {
        this.api = api;
    }

    getMoscowCount(stage) {
        return this.api.get('/users/forma-master-class-users')
        .then(response => {
            return response.data;
        });
    }
}
