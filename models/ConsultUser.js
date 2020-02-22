import Mongoose from 'mongoose';
const userSchema = Mongoose.Schema({
	name: String,
	email: String
});

export default Mongoose.model('User', userSchema);
