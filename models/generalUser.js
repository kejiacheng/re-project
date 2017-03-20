var GeneralUser = require('../lib/mongo').GeneralUser;

module.exports = {
	create: (data) => {
		var generalUser = new GeneralUser({
			phone: data.phone,
			username: data.username,
			password: data.password
		});

		return generalUser.save();
	},
	findPhone: (data) => {
		return GeneralUser
		.findOne({phone: data})
		.exec();
	},
	findUsername: (data) => {
		return GeneralUser
		.findOne({username: data})
		.exec();
	},
	login: (data) => {
		return GeneralUser
		.where('phone').equals(data.phone)
		.where('password').equals(data.password)
		.exec();
	}
}