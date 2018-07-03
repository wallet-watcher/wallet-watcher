const twilio = require('../config/twilioConfig');
const client = require('twilio')(twilio.accountSid, twilio.authToken);

const { fromSms } = twilio;

function sendIncreaseSMS(address, walletBalance, transAmount, toSms) {
  return client.messages
    .create({
      body: `\nALERT: ${address} \n Has Increased by ${transAmount}. Balance is now: ${walletBalance}`,
      to: toSms, // Text this number
      from: fromSms // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}
function sendWelcomeSMS(address, toSms) {
  return client.messages
    .create({
      body: `\nYou are now montioring address: ${address} \n `,
      to: toSms, // Text this number
      from: fromSms // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

function sendDecreaseSMS(address, walletBalance, transAmount, toSms) {
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
  sendDecreaseSMS,
  sendWelcomeSMS
};
