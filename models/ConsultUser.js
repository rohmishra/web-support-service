const Mongoose = require('mongoose');
const userSchema = Mongoose.Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, lowercase: true },
	verification: {
		random_key: String,
		isVerified: Boolean,
	},
	last_updated: { type: Date, default: Date.now },
	created_date: { type: Date, default: Date.now, immutable: true },
	reff_by: Mongoose.SchemaTypes.ObjectId
});



module.exports = Mongoose.model('User', userSchema);
