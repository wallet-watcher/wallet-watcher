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

// TODO: Middleware to decrement and then delete self when counter === 0

userSchema.methods.decrement = function() {
  console.log("HIT")
  this.counter = this.counter--;
  if (this.counter <= 0) {
    this.remove(function(err,removed){
      console.log(err);
    });
  }
};

module.exports = mongoose.model('User', userSchema);
