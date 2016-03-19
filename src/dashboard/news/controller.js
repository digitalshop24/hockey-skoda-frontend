'use strict';

import moment from 'moment';


export default class NewsCtrl {
    constructor(newsService) {
        this.service = newsService;
        this.months = [];
        this.monthNames = ['январь', 'февраль', 'март', 'апрель', 'май',
            'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        Array.from(new Array(12), (e, i) => i).forEach((monthIndex, index) => {
            this.months.push({
                monthIndex: monthIndex,
                viewIndex: monthIndex + 1,
                name: this.monthNames[index]
            })
        });
    }
}