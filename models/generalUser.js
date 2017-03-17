var GeneralUser = require('../lib/mongo').GeneralUser;

module.exports = {
	create: (data) => {
		var generalUser = new GeneralUser({
			phoneNum: data.phoneNum,
			name: data.name,
			password: data.password
		});

		return generalUser.save();
	},
	findPhoneNum: (data) => {
		return GeneralUser
		.findOne({phoneNum: data})
		.exec();
	}

}