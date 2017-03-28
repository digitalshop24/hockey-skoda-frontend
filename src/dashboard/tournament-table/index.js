'use strict';

import angular from 'angular';
import TrnmntTableCtrl from './controller.js';
import TrnmntTableService from './service.js';

export default angular.module('dashboard.tournament-table', [])
    .service('TrnmntTableService', TrnmntTableService)
    .config(function ($stateProvider) {
        $stateProvider
            .state('dashboard.tournament-table', {
                template: require('./template.html'),
                url: '/tournament-table',
                controller: TrnmntTableCtrl,
                controllerAs: 'ctrl',
                resolve: {
                    token: ($stateParams) => {
                    return $stateParams.reset_password_token;
    }
    }
    });
    });
    /*better rewrite as directive,that sets pseudo-element width ,depending on sibling span width*/
     $(document).ready(function(){
         var i=1;
         $(".quaterfinal-pair-participant").each(function(){
             var siblingWidth=$(this).children("span").width();
             var pseudoWidth=$(this).width()-siblingWidth-40;
             var pseudoWidthExtended=pseudoWidth+9;
             ;
             if(i<9){
                $('head').append("<style>.quaterfinal-pair-participant-"+i+":after{width:"+pseudoWidth+"px;}</style>");
            } else{
                $('head').append("<style>.quaterfinal-pair-participant-"+i+":after{width:"+pseudoWidthExtended+"px;}</style>");
             };
             i++
        });
     });