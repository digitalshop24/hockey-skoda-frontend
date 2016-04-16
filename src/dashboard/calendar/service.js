'use strict';

export default class CalendarService {
    constructor(api) {
        this.api = api;
    }

    getCalendar() {
        return this.api.get('/calendar/index')
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }
}
