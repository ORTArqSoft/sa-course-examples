const tokenValidator = async function authenticateToken(req, res, next) {
  /*======== bearer must be verified 

    /* you cant access to "resourse name" , "method" and "heades" as well  */
  /*
        if (resource === "users" && req.method === "POST") {
          next();
          return;
        }
    */
  next();
};

module.exports = {
  tokenValidator,
};
