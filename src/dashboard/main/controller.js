'use strict';


export default class MainCtrl {
    constructor(lightingNews, lastNewsInfo) {
        this.lightingNews = lightingNews;
        this.lastNewsInfo = lastNewsInfo;
        this.lastNews = lastNewsInfo.posts;
    }
}