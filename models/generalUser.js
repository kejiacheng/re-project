var GeneralUser = require('../lib/mongo').GeneralUser;

module.exports = {
	create: (data) => {
		var generalUser = new GeneralUser({
			phone: data.phone,
			name: data.name,
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
	}

}