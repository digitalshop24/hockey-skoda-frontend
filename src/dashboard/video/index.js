'use strict';

import angular from 'angular';
import VideoCtrl from './controller.js';
import VideoService from './service.js';

export default angular.module('dashboard.video', [])
    .service('videoService', VideoService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.video', {
                template: require('./template.html'),
                url: '/video',
                controller: VideoCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 40,
                    videos: []
                },
                resolve: {
                    videoInfo: ($stateParams, videoService) => {
                        return videoService.getVideos($stateParams.page, $stateParams.perPage)
                            .then((res) => {
                                res.posts = $stateParams.videos.concat(res.posts);
                                return res;
                            });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    }
                }
            });
    });
