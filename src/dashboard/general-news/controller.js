'use strict';

import moment from 'moment';


export default class GeneralNewsCtrl {
    constructor(newsService, news, daysWithNews, month, day, generalNewsLogicService, $state) {
        generalNewsLogicService.init(daysWithNews, month, day);
        this.generalNewsLogicService = generalNewsLogicService;
        this.service = newsService;
        this.state = $state;
        this.days = [news];
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
        this.daysWithNews = daysWithNews;
        this.loadingPerformed = false;
    }

    loadNext() {
        if (!this.loadingPerformed) {
            this.loadingPerformed = true;
            if (this.generalNewsLogicService.hasNextDay()) {
                this.service.getNewsByDate(this.generalNewsLogicService.getNextDate()).then(res => {
                    this.days.push(res);
                    this.loadingPerformed = false;
                });
            } else if (this.generalNewsLogicService.hasNextMonth()) {
                this.state.go('dashboard.general-news', {month: this.generalNewsLogicService.getNextMonth()}, {reload: true});
            }
        }

    }

}