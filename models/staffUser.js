var StaffUser = require('../lib/mongo').StaffUser;

module.exports = {
	login: (data) => {
		return StaffUser
		.where('phone').equals(data.phone)
		.where('password').equals(data.password)
		.exec();
	}
}