'use strict';

export default class HeaderCtrl {
    constructor(login, session, $state, auth, $scope, notificationService, $interval) {
        this.loginService = login;
        this.user = session.user;
        this.session = session;
        this.state = $state;
        this.auth = auth;
        this.isMenuOpen = false;
        this.isNewsOpen = true;
        this.isForecastOpen = false;
        this.isForumOpen = false;
        this.isPrizeOpen = false;
        this.isSchedOpen = false;
        this.isInterestingOpen = false;
        this.isMenuMobileOpen = false;
        this.isNotifOpen = false;

        $interval(() => {
            if(this.session.isAuthenticated) {
                notificationService.getNotifications().then((res) => {
                    this.notifications = res.notifications;
                });
            }

        }, 60 * 1000);


        $scope.$on('user:updated', (event,data) => {
            this.user = data;
        });
    }

    openLoginPopup() {
        this.loginService.open();
    }

    logout() {
        this.auth.logout().then(()=> {
            this.state.go('dashboard.main');
        });
    }
}
