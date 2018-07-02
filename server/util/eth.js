const axios = require("axios");
const etherScan = require("../config/etherscanConfig");
// let URL = etherScan.etherScanURL + address + etherScan.etherScanURL2;

const addressArray = [
  "00000",
  "0xe2213989f81eeefc8c3577554083c8b6b8a1032c",
  "0xe2213989f81eeefc8c3577554083c8b6b8a1032c"
];

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
  let bool = true;
  axios
    .get(URL)
    .then(response => {
      console.log(response.data.status);
      if ((response.data.status = 0)) {
        return false;
      } else if ((response.data.status = 1)) {
        return true;
      }
    })
    .catch(err => {
      console.log(err);
    });
}
if (validateAddress("0xe2213989f81eeefc8c3577554083c8b6b8a1032c")) {
  console.log("this is true");
} else console.log("this is false");
// getBal(addressArray);
