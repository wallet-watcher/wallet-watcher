const axios = require("axios");
const etherScan = require("../config/etherscanConfig");

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
      console.log(response.data);
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

validateAddress("0xE2213989f81EeEFc8C3577554083c8B6b8a1032c").then(response => {
  console.log(response);
});

module.exports = {
  getBal,
  validateAddress
};
