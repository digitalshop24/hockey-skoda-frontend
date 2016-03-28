'use strict';


export default class MainCtrl {
    constructor(lightingNews, lastNewsInfo, mainService, page, lastNewsAmount) {
        this.service = mainService;
        this.lightingNews = lightingNews;
        this.lastNewsInfo = lastNewsInfo;
        this.lastNews = lastNewsInfo.posts;
        this.newsCurrentIndex = 1;
        this.page = page;
        this.lastNewsAmount = lastNewsAmount;
        this.slidesToShow = 6;
    }

    loadMoreNews() {
        /*if ((this.newsCurrentIndex + this.slidesToShow) >= (this.page * this.lastNewsAmount)) {
            this.page++;
            this.service.getLastNews(this.page, this.lastNewsAmount).then((res) => {
                this.lastNews = this.lastNews.concat(res.posts);
            });
        }*/

    }
}