const fs = require("fs");

function getDataFromJson() {
  let rawdata = fs.readFileSync("data.json");
  const data = JSON.parse(rawdata);
  return data;
}

module.exports = { getDataFromJson };
