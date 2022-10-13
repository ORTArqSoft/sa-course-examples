require("dotenv").config();

const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET || "nothing";
const expires = process.env.JWT_EXPIRES || 10;

const generateJWTUserPermissions = async (user, claims) => {
  let signOptions = {
    expiresIn: expires,
  };
  let token = jwt.sign({ client: user.userId, permissions: claims }, secretKey, signOptions);
  return token;
};

module.exports = {
  generateJWTUserPermissions,
};
