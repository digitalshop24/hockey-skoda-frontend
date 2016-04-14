'use strict';

import angular from "angular";
import buttons from './share-buttons/index.js'
import ShareModal from './share-modal/index.js';
import ShareService from './shareService.js';


export default angular.module('dashboard.share', [
    buttons.name
])
    .service('shareService', ShareService)
    .service('shareModal', ShareModal);