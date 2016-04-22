'use strict';


export default class TestDriveCtrl {
    constructor(tdriveService, cities, cars, modal, modalSpeed) {
        this.cities = cities;
        this.service = tdriveService;
        this.cars = cars;
        this.carId = cars[0].skoda_id;
        this.modal = modal;
        this.modalSpeed = modalSpeed;
    }

    send() {

        const dealerId = this.dealer ? this.dealer.skoda_id : undefined;
        const cityName = this.city ? this.city.name : undefined;
        const data = {
            mobilephone: this.mobilephone,
            ispdagreed: this.ispdagreed,
            car_id: this.carId,
            lastname: this.lastName,
            firstname: this.firstName,
            email: this.email,
            city: cityName,
            dealer_id: dealerId
        };

        this.service.sendRequest(data).then(()=> {
            this.modal.open({
                resolve: {
                    message: () => {
                        return "Заявка на тест-драйв успешно отправлена"
                    }
                }
            });
        }).catch(err => {
            this.modal.open({
                resolve: {
                    message: () => {
                        return err.message || 'Во время регистрации произошла ошибка!';
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
    openSpeed() {
        if(localStorage["modalSpeedTDrive"] == null){
            localStorage["modalSpeedTDrive"] = "showed";
            this.modalSpeed.open({
              resolve: {
                  message: () => {
                    var header = 'Тест-драйв SKODA';
                    var text = 'Пройдя тест-драйв в любом дилерском центре, вы получите уникальный промокод. Введя этот промокод в личном кабинете и набрав необходимое количество баллов, вы получите право участвовать в суперигре!';
                    var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                    return message;
                  }
              },
              windowClass: 'modal-window modal-window_right',
            });
            return;
        }
    }
}