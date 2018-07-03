const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  address: { type: String, required: true },
  phone: { type: String, required: true },
  incoming: { type: Number, required: true },
  outgoing: { type: Number, required: true },
  counter: { type: Number, default: 50 },
  balance: { type: Number }
});

module.exports = mongoose.model('User', userSchema);
