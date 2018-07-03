const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const mongoose = require('mongoose');
const User = require('./db/user');
const { getBal, validateAddress, getSingleBal } = require('./util/eth');
const {
  sendIncreaseSMS,
  sendDecreaseSMS,
  sendWelcomeSMS
} = require('./util/twilio');

const PORT = process.env.PORT || 8000;
const app = express();
const MONGO_URL =
  process.env.MONGOLAB_URI || 'mongodb://localhost:27017/walletwatcher';

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('ruuning ');
});

app.post('/', (req, res) => {
  const { address, phone, incoming, outgoing } = req.body;
  if (!address || !phone || !incoming || !outgoing) {
    res
      .status(422)
      .json({ msg: 'missing address, phone, incomign, or outgoing' });
  } else {
    validateAddress(address)
      .then(valid => {
        if (valid) {
          getSingleBal(address)
            .then(balance => {
              User.create({
                address,
                phone,
                incoming,
                outgoing,
                balance
              })
                .then(user => {
                  // sendWelcomeSMS(address, user.phone);

                  res.send(user);
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          res.status(422).json({ msg: 'address not valid' });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

// check balance

// opt out. web hook stop from twilio

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log('Error connecting to mongodb');
  });
