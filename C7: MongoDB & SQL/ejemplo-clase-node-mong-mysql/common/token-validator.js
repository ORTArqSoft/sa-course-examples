const { verifyToken } = require("./verify-token");
const bind = function () {
  return verifyToken;
};

module.exports = {
  bind,
};
