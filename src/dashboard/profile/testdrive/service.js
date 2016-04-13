'use strict';

export default class ProfileService {
    constructor(api) {
        this.api = api;
    }

    getCoupons() {
        return this.api.get('/users/my_testdrives/coupons').then((res) => {
            return res.data;
        });
    }

    sendCoupon(coupon) {
        return this.api.post('/users/my_testdrives', {
            number: coupon
        }).then((res) => {
            return res.data;
        });
    }

}