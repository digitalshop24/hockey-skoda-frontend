'use strict';

export default class HeaderCtrl {
    constructor(login, session, $state, auth, $scope, notificationService, $interval) {
        this.loginService = login;
        this.user = session.user;
        this.session = session;
        this.state = $state;
        this.auth = auth;
        this.notificationService = notificationService;
        this.isMenuOpen = false;
        this.isNewsOpen = true;
        this.isForecastOpen = false;
        this.isMobileappOpen = false;
        this.isPrizeOpen = false;
        this.isSchedOpen = false;
        this.isInterestingOpen = false;
        this.isMenuMobileOpen = false;
        this.isNotifOpen = false;
        this.isPNewsOpen = false;
        this.isLogoutMenuOpen = false;
        this.isActivitiesOpen = false;
        this.isAnalyticsOpen = false;
        this.isOtherOpen = false;

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

    readAllNotifications() {
        this.isNotifOpen = false;
        this.notificationService.checkNotifications(this.notifications[0].id).then(() => {
            this.notifications = [];
        });
    }

    openLoginPopup() {
        this.loginService.open();
    }

    logout() {
        this.auth.logout().then(()=> {
            this.notifications = [];
            this.state.go('dashboard.main');
        });
    }
}
