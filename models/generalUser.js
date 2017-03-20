var GeneralUser = require('../lib/mongo').GeneralUser;

module.exports = {
	create: (data) => {
		var generalUser = new GeneralUser({
			phone: data.phone,
			name: data.username,
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
		.findOne({name: data})
		.exec();
	},
	login: (data) => {
		return GeneralUser
		.where('phone').equals(data.phone)
		.where('password').equals(data.password)
		.exec();
	}
}