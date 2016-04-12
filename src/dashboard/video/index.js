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
                url: '/video/:id?hashtags',
                controller: VideoCtrl,
                controllerAs: 'ctrl',
                params: {
                    page: 1,
                    perPage: 40,
                    videos: [],
                    tags: []
                },
                resolve: {
                    videoInfo: ($stateParams, videoService) => {
                        if($stateParams.hashtags) {
                            $stateParams.tags = $stateParams.hashtags.split(',');
                        }
                        return videoService.getVideos($stateParams.page, $stateParams.perPage, $stateParams.tags)
                            .then((res) => {
                                res.posts = $stateParams.videos.concat(res.posts);
                                return res;
                            });
                    },
                    page: ($stateParams) => {
                        return $stateParams.page;
                    },

                    videoById: ($stateParams, videoService) => {
                        if($stateParams.id) {
                            return videoService.getVideoById($stateParams.id);
                        }
                        return undefined;
                    },

                    tags: ($stateParams) => {
                        return $stateParams.tags;
                    }
                }
            });
    });
