'use strict';


export default class TestDriveCtrl {
    constructor(tdriveService, $modal) {
        this.cities = ['Москва', 'Санкт-Петербург', 'Томск'];
        this.service = tdriveService;
        this.cars = [
            {img: 'img/resources/img/t_drive/auto2.jpg', name: 'ŠKODA Superb', id: '5'},
            {img: 'img/resources/img/t_drive/auto1.jpg', name: 'ŠKODA Octavia', id: '3'},
            {img: 'img/resources/img/t_drive/auto3.jpg', name: 'ŠKODA Rapid', id: '1'},
            {img: 'img/resources/img/t_drive/auto4.jpg', name: 'ŠKODA Yeti', id: '4'},
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