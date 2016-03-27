'use strict';


export default class TestDriveCtrl {
    constructor(tdriveService, $modal) {
        this.cities = ['Москва', 'Санкт-Петербург', 'Томск'];
        this.service = tdriveService;
        this.cars = [
            {img: 'img/resources/img/td-cars-superb.png', name: 'ŠKODA Superb', id: '5'},
            {img: 'img/resources/img/t_drive/td-cars-octavia.png', name: 'ŠKODA Octavia', id: '3'},
            {img: 'img/resources/img/td-cars-rapid.png', name: 'ŠKODA Rapid', id: '1'},
            {img: 'img/resources/img/t_drive/td-cars-yeti.png', name: 'ŠKODA Yeti', id: '4'},
        ];
        this.carId = '1';
        this.ispdagreed = true;
        this.modal = $modal;
    }

    send() {

        const data = {
            mobilephone: this.mobilephone,
            ispdagreed: this.ispdagreed,
            car_id: this.carId,
            lastname: this.lastName,
            firstname: this.firstName,
            email: this.email,
            city: this.city
        };
        this.service.sendRequest(data).then((response)=> {
            this.modal.open({
                template: '<div class="modal-body">Заявка на тест-драйв успешно отправлена</div>'
            });
        });
    }

    chooseCar(car) {
        this.carId = car.id;
    }
}