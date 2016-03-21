'use strict';

export default class GeneralNewsLogicService {
    constructor(moment) {
        this.moment = moment;
        this.day = undefined;
        this.month = undefined;
        this.daysWithNews = undefined;
        this.nextDay = undefined;
    }

    init(daysWithNews, month, day) {
        this.daysWithNews = daysWithNews;
        this.month = +month;
        this.day = +day;
    }

    get day() {
        return this._day;
    }

    set day(value) {
        this._day = value;
    }

    get month() {
        return this._month;
    }

    set month(value) {
        this._month = value;
    }

    hasNextDay() {
        return this.daysWithNews.findIndex(date => +this.moment(date).date() < this.day) != -1;
    }

    getNextDate() {
        this.nextDay = this.daysWithNews.find(date => +this.moment(date).date() < this.day)
        if (this.nextDay) {
            this.day = moment(this.nextDay).date();
        }
        return this.nextDay;
    }

    hasNextMonth() {
        return this.month > 1;
    }

    getNextMonth() {
        return --this.month;
    }

}
