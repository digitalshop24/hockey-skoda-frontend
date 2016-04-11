'use strict';


export default class NotificationService {
    constructor(api) {
        this.api = api;
    }

    getNotifications(page, perPage) {
        return this.api.get('/notifications',{
            params: {
                page: page,
                per_page: perPage
            }
        }).then((res) => {
            return res.data;
        })
    }

    checkNotifications(lastNotification) {
        return this.api.post('/notifications',{
            notification_id: lastNotification
        }).then((res) => {
            return res.data;
        })
    }
}
