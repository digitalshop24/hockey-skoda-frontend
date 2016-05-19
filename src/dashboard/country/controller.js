'use strict';

export default class countryCtrl {
    constructor(history) {
        this.history = history;
        this.nav = function(slider, i) {
        	var thumb = $(slider.$slides[i]).data('thumb');
       		return 'thumb';};
    }
}