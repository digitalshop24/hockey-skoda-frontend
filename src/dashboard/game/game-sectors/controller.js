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
                var text = 'Текст об этой странице и какие полезности можно получить. Про баллы, про результаты матчей и прочее, например.';
                var message = '<h2>' + header + '</h2><p>' + text + '</p>';
                return message;
              }
          },
          windowClass: 'modal-window modal-window_right',
      });
      return;
    }
}