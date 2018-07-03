const axios = require('axios');
const etherScan = require('../config/etherscanConfig');

function getBal(addressArray) {
  console.log(String(addressArray));
  let addresses = String(addressArray);
  let URL = etherScan.etherScanMultiURL + addresses + etherScan.etherScanURL2;
  axios
    .get(URL)
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });
}

// function getSingleBal(singleAddress) {
//   let address = String(singleAddress);
//   let URL = etherScan.etherScanSingleURL + address + etherScan.etherScanURL2;
//   return axios
//     .get(URL)
//     .then(response => {
//       return response.data.result;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }

async function getSingleBal(singleAddress) {
  let address = String(singleAddress);
  let URL = etherScan.etherScanSingleURL + address + etherScan.etherScanURL2;
  try {
    const balance = await axios
      .get(URL)
      .then(response => {
        return response.data.result;
      })
      .catch(err => {
        console.log(err);
      });
    return balance;
  } catch (err) {
    console.log(err);
  }
}

function validateAddress(oneAddress) {
  let URL = etherScan.etherScanSingleURL + oneAddress + etherScan.etherScanURL2;

  return axios
    .get(URL)
    .then(function(response) {
      if (response.data.status == 0) {
        return false;
      } else if (response.data.status == 1) {
        return true;
      }
    })
    .catch(err => {
      console.log(err);
    });
}

// validateAddress("0xE2213989f81EeEFc8C3577554083c8B6b8a1032c").then(response => {
//   console.log(response);
// });
// getSingleBal("0xe2213989f81eeefc8c3577554083c8b6b8a1032c");
module.exports = {
  getBal,
  getSingleBal,
  validateAddress
};
