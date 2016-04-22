'use strict';


export default class SectorsCtrl {
    constructor(sectors, $state, modalSpeed) {
        this.sectors = sectors;
        this.state = $state;
        this.modal = modalSpeed;
    }

    chooseRandomSector() {
        this.state.go('dashboard.game.cubes', {id: Math.floor(Math.random() * 50) + 1  });
    }
    open() {
      this.modal.open({
          resolve: {
              message: () => {
                var header = 'Конкурсы';
                var text = '<p>Участвуйте в активностях на сайте и набирайте баллы, которые копятся в личном кабинете!</p><br><p>Набрав необходимое количество, Вы сможете выбрать ячейку и, используя свои знания о хоккее, выиграть один из призов от ŠKODA. Каждая ячейка скрывает разный набор призов, поэтому выбирайте тщательно!</p><br><p>Если Вы пройдете тест-драйв у одного из официальных дилеров ŠKODA и наберете 1500 баллов на сайте, то ссможете выбрать Зеленую ячейку и принять участие в конкурсе на розыгрыш автомобиля!</p><br><p>Удачи!</p>';
                var message = '<h2>' + header + '</h2>' + text;
                return message;
              }
          },
          windowClass: 'modal-window modal-window_right',
      });
      return;
    }
}