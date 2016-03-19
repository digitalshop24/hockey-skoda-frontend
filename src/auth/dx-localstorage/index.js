'use strict';

import angular from 'angular';
import localStorage from './service';

export default angular.module('skodaLocalStorage', ['ngStorage'])
    .service('skodaLocalStorage', localStorage)
    .config(($localStorageProvider) => {
        $localStorageProvider.setKeyPrefix('hockey-skoda-');
    });
