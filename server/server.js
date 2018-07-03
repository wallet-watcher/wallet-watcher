const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const mongoose = require("mongoose");
const User = require("./db/user");
const { getBal, validateAddress, getSingleBal } = require("./util/eth");
const {
  sendIncreaseSMS,
  sendDecreaseSMS,
  sendWelcomeSMS
} = require("./util/twilio");

const PORT = process.env.PORT || 8000;
const app = express();
const MONGO_URL =
  process.env.MONGOLAB_URI || "mongodb://localhost:27017/walletwatcher";

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("running ");
});

app.post("/", (req, res) => {
  const { address, phone, incoming, outgoing } = req.body;
  if (!address || !phone || !incoming || !outgoing) {
    res
      .status(422)
      .json({ msg: "missing address, phone, incoming, or outgoing" });
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
                  sendWelcomeSMS(address, user.phone);
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
          res.status(422).json({ msg: "address not valid" });
        }
      })
      .catch(err => {
        res.status(500).json(err);
      });
  }
});

setInterval(function() {
  // 2d array initialized with empty arrays to hold 20 users per row (this is how many addresses the API request can handle at once)
  // TODO: Calculate max amount of accounts
  const activeUsers = Array(2)
    .fill(null)
    .map(() => Array());

  User.find({})
    .then(res => {
      // populate the activeUsers with each users' address and balance from DB
      let row = 0;
      for (let i = 0; i < res.length; i++) {
        if (activeUsers[row].length === 20) {
          row++;
        }
        activeUsers[row].push([
          res[i].address,
          res[i].balance,
          res[i].incoming,
          res[i].outgoing,
          res[i].phone,
          res[i]._id
        ]);
      }

      // hit end point with the 20 addresses in the row (1 second in between each request)
      let time = 0;
      for (let i = 0; i < activeUsers.length; i++) {
        if (activeUsers[i].length) {
          setTimeout(() => {
            getBal(activeUsers[i].map(user => user[0]))
              .then(res => {
                // check if any balances have changed
                const oldBalances = activeUsers[i].map(user => user[1]);
                for (let j = 0; j < res.length; j++) {
                  if (res[j].balance - oldBalances[j] > activeUsers[i][j][2]) {
                    User.findById(activeUsers[i][j][5])
                      .then(user => {
                        if (user !== null) {
                          user.decrement(res[j].balance);
                        } else {
                          console.log("no users in db");
                        }
                      })
                      .catch(err => console.log(err));
                    sendIncreaseSMS(
                      activeUsers[i][j][0],
                      res[j].balance,
                      res[j].balance - oldBalances[j],
                      activeUsers[i][j][4]
                    );
                  } else if (
                    oldBalances[j] - res[j].balance >
                    activeUsers[i][j][3]
                  ) {
                    User.findById(activeUsers[i][j][5])
                      .then(user => {
                        if (user !== null) {
                          user.decrement(res[j].balance);
                        } else {
                          console.log("no users in db");
                        }
                      })
                      .catch(err => console.log(err));
                    sendDecreaseSMS(
                      activeUsers[i][j][0],
                      res[j].balance,
                      oldBalances[j] - res[j].balance,
                      activeUsers[i][j][4]
                    );
                  }
                }
              })
              .catch(err => console.log(err));
          }, time);
          time += 1000;
        }
      }
    })
    .catch(err => console.log(err));
}, 2000);

// opt out. web hook stop from twilio

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log("Error connecting to mongodb");
  });
