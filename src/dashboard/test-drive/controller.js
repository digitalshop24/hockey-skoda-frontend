'use strict';


export default class TestDriveCtrl {
    constructor(tdriveService, cities, cars, modal) {
        this.cities = cities;
        this.service = tdriveService;
        this.cars = cars;
        this.carId = cars[0].skoda_id;
        this.modal = modal;
    }

    send() {

        const data = {
            mobilephone: this.mobilephone,
            ispdagreed: this.ispdagreed,
            car_id: this.carId,
            lastname: this.lastName,
            firstname: this.firstName,
            email: this.email,
            city: this.city.skoda_id,
            dealer_id: this.dealer.skoda_id
        };

        this.service.sendRequest(data).then(()=> {
            this.modal.open({
                resolve: {
                    message: () => {
                        return "Заявка на тест-драйв успешно отправлена"
                    }
                }
            });
        });
    }

    chooseCar(car) {
        this.carId = car.skoda_id;
    }

    loadDealer() {
        this.service.getDealers(this.city.id).then((res)=> {
            this.dealers = res;
        });
    }
}