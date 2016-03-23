'use strict';

export default class HeaderCtrl {
	constructor(login) {
		this.loginService = login;
	}

	openLoginPopup() {
		this.loginService.open();
	}
}
