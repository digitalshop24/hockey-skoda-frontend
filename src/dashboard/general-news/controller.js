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
        this.activeMonth = month;
        this.monthNames = ['январь', 'февраль', 'март', 'апрель', 'май',
            'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        Array.from(new Array(12), (e, i) => i).forEach((monthIndex, index) => {
            var humanMonthIndex = monthIndex + 1;
            const viewIndex = humanMonthIndex < 10 ? '0' + humanMonthIndex : humanMonthIndex;
            this.months.push({
                monthIndex: humanMonthIndex,
                viewIndex: viewIndex,
                name: this.monthNames[index]
            })
        });
        this.months = this.months.reverse();
        this.daysWithNews = daysWithNews;
        this.shouldLoad = true;
    }

    loadNext() {
        if (this.shouldLoad) {
            this.shouldLoad = false;
            if (this.generalNewsLogicService.hasNextDay()) {
                this.service.getNewsByDate(this.generalNewsLogicService.getNextDate()).then(res => {
                    this.days.push(res);
                    this.shouldLoad = true;
                });
            } else if (this.generalNewsLogicService.hasNextMonth()) {
                this.state.go('dashboard.general-news', {month: this.generalNewsLogicService.getNextMonth()}, {reload: true});
            }
        }

    }

    changeMonth(month) {
        if(month.monthIndex <= moment().month() + 1) {
            this.state.go('dashboard.general-news', {month: month.monthIndex, loadExactlyDayNews:false}, {reload: true});
        }
    }

}