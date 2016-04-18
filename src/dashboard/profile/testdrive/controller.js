'use strict';


export default class MytestdriveCtrl {
    constructor(moment, coupons, mytestdriveService, modal, $state) {
        this.today = moment().format('DD MMMM');
        this.coupons = coupons;
        this.mytestdriveService = mytestdriveService;
        this.modal = modal;
        this.$state = $state;
    }

    sendCoupon() {
        this.mytestdriveService.sendCoupon(this.coupon).then(res => {
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