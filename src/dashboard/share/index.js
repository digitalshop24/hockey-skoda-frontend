'use strict';

import angular from "angular";
import buttons from './share-buttons/index.js'
import ShareModal from './share-modal/index.js';
import ShareService from './shareService.js';


export default angular.module('dashboard.share', [
    buttons.name
])
    .service('shareService', ShareService)
    .service('shareModal', ShareModal)
    .directive('socialInit', function () {
        return {
            link: function () {

                angular.element(document).ready(() => {
                    $(document).off('click', '.sharing-link').on('click', '.sharing-link', function(){
                        window.open($(this).attr('href'),"","width=400,height=400");
                        return false;
                    });
                });
            }
        }
    });