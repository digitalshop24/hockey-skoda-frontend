'use strict';


export default class SocialCtrl {
    constructor(auth, modal, profileService, $state) {
        this.auth = auth;
        this.modal = modal;
        this.profileService = profileService;
        this.state = $state;
        this.events = [{
            badgeClass: 'info',
            badgeIconClass: 'glyphicon-check',
            title: 'First heading',
            content: 'Some awesome content.'
        }, {
            badgeClass: 'warning',
            badgeIconClass: 'glyphicon-credit-card',
            title: 'Second heading',
            content: 'More awesome content.'
        }];
    }


}