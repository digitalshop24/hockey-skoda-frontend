'use strict';


export default class MytestdriveCtrl {
    constructor(moment) {
        this.today = moment().format('DD MMMM');
    }
}