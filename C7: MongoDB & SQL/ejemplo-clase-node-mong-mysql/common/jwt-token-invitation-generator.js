require("dotenv").config();
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "nothing";
const expires = process.env.JWT_EXPIRES || "10m";
const generateJWTUserPermissions = async (invite, claims) => {
  let signOptions = {
    expiresIn: expires,
  };
  let token = jwt.sign({ client: invite.inviteId, permissions: claims }, secretKey, signOptions);
  return token;
};

module.exports = {
  generateJWTUserPermissions,
};
