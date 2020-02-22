const Mongoose = require('mongoose');
const userSchema = Mongoose.Schema({
	name: String,
	email: String
});

module.exports = Mongoose.model('User', userSchema);
