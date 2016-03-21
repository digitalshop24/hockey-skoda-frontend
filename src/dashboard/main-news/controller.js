'use strict';

export default class NewsCtrl {
    constructor($state, news, daysWithNews) {
        this.daysWithNews = daysWithNews;
        this.state = $state;
        this.news = news;
    }
}