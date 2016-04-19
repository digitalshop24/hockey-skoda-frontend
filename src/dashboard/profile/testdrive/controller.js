'use strict';


export default class MytestdriveCtrl {
    constructor(moment, coupon, mytestdriveService, modal, $state) {
        this.today = moment().format('DD MMMM');
        this.coupon = coupon;
        this.mytestdriveService = mytestdriveService;
        this.modal = modal;
        this.$state = $state;
    }

    sendCoupon() {
        this.mytestdriveService.sendCoupon(this.couponCode).then(res => {
            this.mytestdriveService.getCoupons().then(res => {
                this.coupons = res;
            });
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Купон успешно активирован!'
                    }
                }
            });
        })
    }

    startGame() {
        this.$state.go('dashboard.game.sectors');
    }
}