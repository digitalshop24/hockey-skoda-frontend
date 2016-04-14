'use strict';


export default class ShareService {
    constructor(api) {
        this.api = api;
    }

    shareAttempt(type) {
        return this.api.post(`/users/shared/${type}`).then((res) => {
            return res.data;
        })
    }
}
