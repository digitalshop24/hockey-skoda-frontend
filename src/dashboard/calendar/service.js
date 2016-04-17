'use strict';

export default class CalendarService {
    constructor(api) {
        this.api = api;
    }

    getCalendar() {
        return this.api.get('/schedule/index')
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }

    getSubscriptions() {
        return this.api.get('/calendar/subscriptions')
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }

    subscribe(id) {
        return this.api.post('/calendar/subscribe', {
            match_id: id
        })
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }

    unsubscribe(id) {
        return this.api.post('/calendar/unsubscribe', {
            subscription_id: id
        })
            .then(response => {
                return response.data;
            }).catch(response => {
                throw response.data.error;
            });
    }
}
