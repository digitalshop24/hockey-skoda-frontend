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
        this.monthNames = ['январь', 'февраль', 'март', 'апрель', 'май',
            'июнь', 'июль', 'август', 'сентябрь', 'октябрь', 'ноябрь', 'декабрь'];
        this.monthIndexes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
        this.firstDate = new Date(2016, 3, 1);
        this.currentDate = new Date();
        this.startYear = this.firstDate.getFullYear();
        this.startMonth = this.firstDate.getMonth() + 1;
        this.monthDiff = function(d1, d2) {
            var months;
            months = (d2.getFullYear() - d1.getFullYear()) * 12;
            months -= d1.getMonth();
            months += d2.getMonth() + 1;
            return months <= 0 ? 0 : months;
        };
        this.countMonths = this.monthDiff(this.firstDate, this.currentDate);
        this.monthYearIndexes = [];

        for(var i=0; i < this.countMonths; i++){
            var additionalYear = Math.floor((this.startMonth + i - 1) / 12);
            var monthIndex = this.startMonth + i > 12 ? this.startMonth + i - 12 : this.startMonth + i;
            this.monthYearIndexes.push({month: monthIndex, year: (this.startYear + additionalYear)});
        }

        this.monthYearIndexes.forEach((monthYearIndex, index) => { // april is lowest border
            var humanMonthIndex = monthYearIndex.month;
            const viewIndex = humanMonthIndex < 10 ? '0' + humanMonthIndex : humanMonthIndex;
            this.months.push({
                monthIndex: humanMonthIndex,
                viewIndex: viewIndex,
                name: this.monthNames[monthYearIndex.month - 1],
                year: monthYearIndex.year
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
        this.state.go('dashboard.general-news', {
            month: month.monthIndex,
            year: month.year,
            loadExactlyDayNews: false
        }, {reload: true});
    }

    changeMobileMonth() {
        this.state.go('dashboard.general-news', {
            month: this.mobileCurrentIndex,
            loadExactlyDayNews: false
        });
    }

}