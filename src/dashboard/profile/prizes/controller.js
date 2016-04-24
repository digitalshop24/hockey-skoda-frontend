'use strict';


export default class PrizesCtrl {
    constructor(prizes) {
        this.prizes = prizes;
    }

    save(href){
        var a  = document.createElement('a');
        var url = href;
        a.href = url;
        a.download = 'myTantam.png';
        a.click();
    }
}