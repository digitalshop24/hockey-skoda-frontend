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
        this.responsive = [
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 2,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1
              }
            }
            
          ];
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