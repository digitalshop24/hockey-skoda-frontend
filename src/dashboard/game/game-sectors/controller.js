'use strict';


export default class SectorsCtrl {
    constructor(sectors, $state) {
        this.sectors = sectors;
        this.state = $state;
    }

    chooseRandomSector() {
        this.state.go('dashboard.game.cubes', {id: Math.floor(Math.random() * 50) + 1  });
    }
}