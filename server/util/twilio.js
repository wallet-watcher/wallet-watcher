//auth twilio client
var authToken = "d495fdae5d1bf3d80b53e680480fc8b3";
const accountSid = "AC6f11471cb18f487bb1f4a6c6df9e1ff3";
const client = require("twilio")(accountSid, authToken);

// TODO: check address valid
/* TODO: 

1. get wallet address from db
2. if wallet balance has changed and falls within threshold for alert
3. send text to number stored in db

*/

// function sendSMS(text, toSms, fromSms) {
//   return client.messages
//     .create({
//       body: text,
//       to: toSms, // Text this number
//       from: fromSms // From a valid Twilio number
//     })
//     .then(message => console.log(message.sid));
// }

// const createWallet = (req, res) => {
//   console.log("creating a wallet");
//   //TODO: check if merchant has enough btc to sell to customer

//   const { toSms } = req.body;
//   const newWallet = wallet();
//   const { address, mnemonic, privateKey } = newWallet;
//   sendSMS(
//     `\nWallet Address: ${address} \n \nPrivate Key ${privateKey}\n\n Mnemonic: ${mnemonic}`,
//     toSms,
//     fromSms
//   );
//   res.status(200).json(newWallet);
// };
