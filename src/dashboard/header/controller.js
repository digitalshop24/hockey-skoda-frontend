'use strict';

export default class HeaderCtrl {
	constructor(login, session) {
		this.loginService = login;
		const lastNameAndFirstName = (session.user.last_name || '') + " " + (session.user.first_name || '')
		this.name = lastNameAndFirstName.trim() ? lastNameAndFirstName : session.user.email;
	}

	openLoginPopup() {
		this.loginService.open();
	}
}
