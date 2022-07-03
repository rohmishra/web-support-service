const Mongoose = require('mongoose');
const userSchema = Mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true
  },
  verification: {
    random_key: String,
    isVerified: {
      type: Boolean,
      default: false
    }
  },
  last_updated: {
    type: Date,
    default: Date.now
  },
  created_date: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  reff_by: Mongoose.SchemaTypes.ObjectId
});

// userSchema.method('verify', (User, cb) => {
// TODO: Send email verification
// const DOMAIN = process.env.DOMAIN;
// const mg = mailgun({
// 	apiKey: process.env.MG_API_KEY,
// 	domain: DOMAIN
// });
// const data = {
// 	from: process.env.FROM_TEXT || 'email verification',
// 	to: User.email,
// 	subject: `Hi, ${User.name} Lets Talk!`,
// 	template: 'contact_verification',
// 	'h:X-Mailgun-Variables': {
// 		email_base64: Buffer.from(User.email, 'utf8').toString('base64'),
// 		unique_token: this.verification_token
// 	}
// };
// try {
// 	mg.messages().send(data, function (error, body) {
// 		if (envmode === 'DEV') {
// 			console.log(body);
// 		}
// 	});
// } catch (e) {
// 	console.message('=== Couldn\'t send email ===');
// 	console.log(e);
// }
// });


module.exports = Mongoose.model('User', userSchema);