'use strict';


export default class TestDriveCtrl {
    constructor(tdriveService, modal) {
        this.cities = ["Ростов-на-Дону", "Архангельск", "Санкт-Петербург", "Псков", "Пермь", "п/о Архангельское", "Калуга", "Великий Новгород",
            "г. Московский", "Вологда", "Москва", "г. Балашиха", "Воронеж", "Самара", "Оренбург", "г. Химки", "Волгоград",
            "Нижний Новгород", "Барнаул", "Новосибирск", "Новокузнецк", "Пятигорск", "Ставрополь", "Екатеринбург", "Ижевск",
            "Сочи", "Орск", "Уфа", "Сургут", "Тюмень", "г. Краснознаменск", "Набережные Челны", "Тверь", "Петрозаводск",
            "Сыктывкар", "Челябинск", "Абакан", "Кострома", "Нижний Тагил", "Красноярск", "Омск", "Другой город", "Тамбов",
            "Астрахань", "Минеральные Воды", "Магнитогорск", "Свердловская обл, Верхняя Пышма", "Йошкар-Ола", "Краснодар",
            "Краснодар, пос. Яблоновский", "Тула", "р.п. Новоивановское", "Новороссийск", "г. Каменск-Уральский", "Саратов",
            "Северодвинск", "Старый Оскол", "Владимир", "Симферополь", "Казань", "Хардиково деревня", "Саранск", "Липецк",
            "Брянск", "Чебоксары", "Ярославль", "Кемерово", "Котельники", "Тольятти", "Белгород", "Киров", "Стерлитамак",
            "Ульяновск", "Иваново", "г. Подольск", "Калининград", "Череповец", "Миасс", "п. Солнечный", "Иркутск", "Смоленск",
            "Мурманск", "Томск", "Рязань", "Курск", "Пенза", "Майкоп"];
        this.service = tdriveService;
        this.cars = [
            {img: 'img/resources/img/t_drive/td-cars-superb.png', name: 'ŠKODA Superb', id: '5'},
            {img: 'img/resources/img/t_drive/td-cars-octavia.png', name: 'ŠKODA Octavia', id: '3'},
            {img: 'img/resources/img/t_drive/td-cars-rapid.png', name: 'ŠKODA Rapid', id: '1'},
            {img: 'img/resources/img/t_drive/td-cars-yeti.png', name: 'ŠKODA Yeti', id: '4'}
        ];
        this.carId = '5';
        this.ispdagreed = true;
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
            city: this.city
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
        this.carId = car.id;
    }
}