'use strict';

export default class ProfileService {
    constructor(api) {
        this.api = api;
    }

    getCoupon() {
        return this.api.get('/users/my_testdrives').then((res) => {
            return res.data;
        });
    }

    sendCoupon(coupon) {
        return this.api.post('/users/my_testdrives', {
            number: coupon
        }).then((res) => {
            return res.data;
        }).catch(err => {
            throw err.data;
        });
    }

}
