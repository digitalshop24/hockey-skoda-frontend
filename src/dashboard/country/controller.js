'use strict';

export default class CountryCtrl {
    constructor(history) {
        this.history = history;
        this.nav = function(slider, i) {
        	const year = $(slider.$slides[i]).data('year');
        	const country = $(slider.$slides[i]).data('country');
            return '<a>'+year+ " - " + country +'</a>';  
        };
    }
}