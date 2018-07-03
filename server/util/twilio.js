const twilio = require('../config/twilioConfig');
const client = require('twilio')(twilio.accountSid, twilio.authToken);

const fromSms = twilio.fromSms;

function sendIncreaseSMS(address, walletBalance, transAmount, toSms, fromSms) {
  return client.messages
    .create({
      body: `\nALERT: ${address} \n Has Increased by ${transAmount}. Balance is now: ${walletBalance}`,
      to: toSms, // Text this number
      from: fromSms // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

function sendDecreaseSMS(address, walletBalance, transAmount, toSms, fromSms) {
  return client.messages
    .create({
      body: `\nALERT: ${address} \n Has Increased by ${transAmount}. Balance is now: ${walletBalance}`,
      to: toSms, // Text this number
      from: fromSms // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

module.exports = {
  sendIncreaseSMS,
  sendDecreaseSMS
};
