var StaffUser = require('../lib/mongo').StaffUser;

module.exports = {
	login: (data) => {
		console.log(data);
		return StaffUser
		.where('phone').equals(data.phone)
		.where('password').equals(data.password)
		.exec();
	}
}