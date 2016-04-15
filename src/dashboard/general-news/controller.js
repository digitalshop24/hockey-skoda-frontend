'use strict';

import moment from 'moment';


export default class GeneralNewsCtrl {
    constructor(newsService, news, daysWithNews, month, day, generalNewsLogicService, $state, tweets) {
        generalNewsLogicService.init(daysWithNews, month, day);
        this.generalNewsLogicService = generalNewsLogicService;
        this.service = newsService;
        this.state = $state;
        this.days = [news];
        this.months = [];
        this.activeMonth = month;
        this.tweets = tweets;
        this.currentMonthIndex = new Date().getMonth() + 1;
        this.slickCurrentMonthIndex = month - 1;
        this.mobileCurrentIndex = month - 1;
        this.monthNames = ['апрель', 'май',
            'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        Array.from(new Array(this.currentMonthIndex - 3), (e, i) => i + 3).forEach((monthIndex, index) => { // april is lowest border
            var humanMonthIndex = monthIndex + 1;
            const viewIndex = humanMonthIndex < 10 ? '0' + humanMonthIndex : humanMonthIndex;
            this.months.push({
                monthIndex: humanMonthIndex,
                viewIndex: viewIndex,
                name: this.monthNames[index]
            })
        });
        this.mobileMonths = this.months.slice(0);
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

    loadPrevious() {
        if (this.shouldLoad) {
            this.shouldLoad = false;
            if (this.generalNewsLogicService.hasPreviousDay()) {
                this.service.getNewsByDate(this.generalNewsLogicService.getPreviousDate()).then(res => {
                    this.days.unshift(res);
                    this.shouldLoad = true;
                });
            } else if (this.generalNewsLogicService.hasPreviousMonth()) {
                this.state.go('dashboard.general-news', {month: this.generalNewsLogicService.getPreviousMonth()}, {reload: true});
            }
        }

    }

    changeMonth(month) {
        if (month.monthIndex <= moment().month() + 1) {
            this.state.go('dashboard.general-news', {
                month: month.monthIndex,
                loadExactlyDayNews: false
            }, {reload: true});
        }
    }

    changeMobileMonth() {
        this.state.go('dashboard.general-news', {
            month: this.mobileCurrentIndex,
            loadExactlyDayNews: false
        });
    }

}