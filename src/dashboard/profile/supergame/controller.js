'use strict';

export default class SupergameCtrl {
    constructor(session, $rootScope) {
        this.$rootScope = $rootScope;
        this.user = session.user;
    }


    startQuiz() {
        this.$rootScope.$broadcast('profile:supergame', {
            isSuperFinal: false
        });
    }

    startSuperfinalQuiz() {
        this.$rootScope.$broadcast('profile:supergame', {
            isSuperFinal: true
        });
    }
}