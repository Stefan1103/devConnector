const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model('user', UserSchema);