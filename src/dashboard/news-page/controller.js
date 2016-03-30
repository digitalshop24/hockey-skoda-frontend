'use strict';


export default class NewspageCtrl {
    constructor(news) {
        this.news = news;
        this.rubric = news.rubric;
        this.rubricState = this.getRubricState(this.rubric.api_path);
        this.socialShareText = news.title + "\n" + news.description;
        this.socialShareUrl = "http://www.skoda-auto.com/_layouts/Skoda.K2/images/social/logo-skoda-share-fb.jpg";
    }

    getRubricState(stateApiName) {
        switch (stateApiName) {
            case "blog":
                return "dashboard.blog";
            case "news":
                return "dashboard.general-news";
        }
    }
}