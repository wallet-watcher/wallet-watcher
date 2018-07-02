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

async function validateAddress(oneAddress) {
  let URL = etherScan.etherScanSingleURL + oneAddress + etherScan.etherScanURL2;
  let isItGood = true;
  try {
    let response = await axios.get(URL);
    // let resCode = response.data.status;
    // console.log(resCode);
    if (response.status == 200) {
      if (response.data.status == 0) {
        console.log("bad address");
        isItGood = false;
      } else if (response.data.status == 1) {
        console.log("good address");
        isItGood = true;
      }
      return isItGood;
    }
  } catch (error) {
    console.log(error);
  }

  //   if (resCode === 0) {
  //     console.log("bad address");
  //     return false;
  //   } else if (resCode === 1) {
  //     console.log("good address");
  //     return true;
  //   }
  // })
  // .catch(err => {
  //   console.log(err);
  // });
}

let ggg = validateAddress("0xe2213989f81eeefc8c3577554083c8b6b8a1032c");

console.log(ggg == true);
// getBal(addressArray);
