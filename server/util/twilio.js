const twilio = require("../config/twilioConfig");
const client = require("twilio")(twilio.accountSid, twilio.authToken);
const fromSms = twilio.fromSms;

const toSms = "+16286008772";
const transAmount = " 1 eth";
const address = "0xE2213989f81EeEFc8C3577554083c8B6b8a1032c";
const walletBalance = "10 eth";

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

sendIncreaseSMS(address, walletBalance, transAmount, toSms, fromSms);

sendDecreaseSMS(address, walletBalance, transAmount, toSms, fromSms);

module.exports = {
  sendIncreaseSMS,
  sendDecreaseSMS
};
