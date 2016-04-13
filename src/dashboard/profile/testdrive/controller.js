'use strict';


export default class MytestdriveCtrl {
    constructor(moment, coupons, mytestdriveService, modal) {
        this.today = moment().format('DD MMMM');
        this.coupons = coupons;
        this.mytestdriveService = mytestdriveService;
        this.modal = modal;
    }

    sendCoupon() {
        this.mytestdriveService.sendCoupon(this.coupon).then(res => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Купон успешно активирован!'
                    }
                }
            });
        })
    }
}