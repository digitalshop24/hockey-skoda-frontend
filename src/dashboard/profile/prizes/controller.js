'use strict';


export default class PrizesCtrl {
    constructor(prizes, cities, tdriveService, prizesService, modal, user) {
        this.prizes = prizes;
        this.cities = cities;
        this.modal = modal;
        this.user = user;
        this.tdriveService = tdriveService;
        this.prizesService = prizesService;

        if(user.dealer && user.dealer_city) {
            this.cities = [user.dealer_city];
            this.city = this.cities[0];
            this.dealers = [user.dealer];

            this.dealer = this.dealers[0];
            this.dealer.info = this.dealer.name;
        }
    }

    loadDealer() {
        this.tdriveService.getDealers(this.city.id).then((res)=> {
            this.dealers = res;
        });
    }

    saveDealer() {
        this.prizesService.chooseDealer(this.dealer.skoda_id).then(res => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return 'Дилер успешно сохранен!'
                    }
                }
            });
        })
    }

    save(href){
        var a  = document.createElement('a');
        var url = href;
        a.href = url;
        a.download = 'myTantam.png';
        a.click();
    }
}