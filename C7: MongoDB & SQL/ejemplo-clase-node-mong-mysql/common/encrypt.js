const crypto = require("crypto");

const hashing = (text) => {
  let hashed = crypto.createHash("sha256").update(text).digest("base64");
  return hashed;
};

module.exports = {
  hashing,
};
