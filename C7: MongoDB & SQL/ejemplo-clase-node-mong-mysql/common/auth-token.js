const { HttpErrorCodes } = require("../exceptions/exceptions");
const tokenValidator = require("./token-validator");
const authenticateToken = async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader;

  if (token == null) {
    return res.sendStatus(HttpErrorCodes.ERROR_401_UNAUTHORIZED);
  }

  try {
    let verify = tokenValidator.bind();
    let decode = await verify(token);
  } catch (err) {
    return res.sendStatus(HttpErrorCodes.ERROR_403_FORBIDDEN);
  }
  next();
};

module.exports = {
  authenticateToken,
};
