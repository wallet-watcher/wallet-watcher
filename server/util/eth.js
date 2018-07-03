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

function validateAddress(oneAddress) {
  let URL = etherScan.etherScanSingleURL + oneAddress + etherScan.etherScanURL2;

  return axios
    .get(URL)
    .then(function(response) {
      console.log(response.data.status);
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

// validateAddress('0xe2213989f81eeefc8c3577554083c8b6b8a1032c').then(response => {
//   console.log(response);
// });

module.exports = {
  getBal,
  validateAddress
};
