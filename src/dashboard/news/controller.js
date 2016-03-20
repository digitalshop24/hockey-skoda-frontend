'use strict';

import moment from 'moment';


export default class NewsCtrl {
    constructor(newsService, news) {
        this.service = newsService;
        this.news = news;
        this.months = [];
        this.monthNames = ['январь', 'февраль', 'март', 'апрель', 'май',
            'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        Array.from(new Array(12), (e, i) => i).forEach((monthIndex, index) => {
            const viewIndex = (monthIndex + 1) < 10 ? '0' + (monthIndex + 1) : (monthIndex + 1);
            this.months.push({
                monthIndex: monthIndex,
                viewIndex: viewIndex,
                name: this.monthNames[index]
            })
        });
        this.months = this.months.reverse();
    }
}