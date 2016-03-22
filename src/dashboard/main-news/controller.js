'use strict';

export default class NewsCtrl {
    constructor($state, news, daysWithNews, moment) {
        this.daysWithNews = daysWithNews;
        this.state = $state;
        this.news = news;
        this.news.forEach(news => {
            news.dayId = +moment(news.published_at).date();
        })
    }
}