'use strict';

export default class NewsCtrl {
    constructor($state, moment) {
        this.state = $state;
        this.moment = moment;
    }

    showNews() {
        const month = this.moment(this.mainNews.published_at).month() + 1;
        const day = this.moment(this.mainNews.published_at).date();
        this.state.go('dashboard.general-news', {month: month, day: day, loadExactlyDayNews: true});
    }
}
