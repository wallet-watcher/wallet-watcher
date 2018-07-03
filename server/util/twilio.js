const twilio = require("../config/twilioConfig");
const client = require("twilio")(twilio.accountSid, twilio.authToken);

const { fromSms } = twilio;

function sendIncreaseSMS(address, walletBalance, transAmount, toSms) {
  return client.messages
    .create({
      body: `\nALERT: ${address} \n Has Increased. Your Balance is now: ${walletBalance /
        1000000000000000000} ETH`,
      to: toSms, // Text this number
      from: fromSms // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

function sendWelcomeSMS(address, toSms) {
  return client.messages
    .create({
      body: `\nYou are now monitoring address: ${address} \n `,
      to: toSms, // Text this number
      from: fromSms // From a valid Twilio number
    })
    .then(message => console.log(message.sid));
}

function sendDecreaseSMS(address, walletBalance, transAmount, toSms) {
  return client.messages
    .create({
      body: `\nALERT: ${address} \n Has Decreased. Your Balance is now: ${walletBalance /
        1000000000000000000} ETH`,
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

// sendIncreaseSMS("122222", "41613131059259259", "111", "+16286008772");
