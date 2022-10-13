const { ElementNotFoundException } = require("../../exceptions/exceptions.js");
const { InvalidCredentials } = require("../../exceptions/exceptions.js");
const { validateCredentials } = require("../login/validate-login");
const { messageBinder } = require("../login/locale/locale-binder");

const { generateJWTUserPermissions } = require("../../common/jwt-token-generator");
const { hashing } = require("../../common/encrypt");

const config = require("config");
const tokenConfig = config.get("token");
var dbModels;

const setDbModels = async function (models) {
  dbModels = models;
};

const create = async function (anUser, t) {
  let credentials = {
    userId: anUser.userId,
    password: hashing(anUser.password),
  };

  let newCredentials = await dbModels.Credentials.create(credentials, { transaction: t });
  return newCredentials;
};

const getCredentials = async function (id) {
  let aCredentials = await dbModels.Credentials.findOne({ where: { userId: id } });
  if (!aCredentials) {
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  return aCredentials;
};

const verifyPassword = async (userCredentials, credentials) => {
  let hashedPassword = hashing(credentials.password);
  console.log(hashedPassword + " " + userCredentials.password);
  if (userCredentials.password != hashedPassword) {
    console.log(`[service: logic-login] [function: verifyPassword] [type:W] [data: password not match]`);

    throw new InvalidCredentials(messageBinder.notFound);
  }
};

const rolesToClaims = function (user) {
  let claims = [];
  if (user.isAdministrator) {
    claims.push("Admin");
  }
  return claims;
};

const login = async function (credentials) {
  await validateCredentials(credentials);
  let user = await getUser(credentials.email);
  let userCredentials = await getCredentials(user.userId);
  await verifyPassword(userCredentials, credentials);
  let token = await generateJWTUserPermissions(user, rolesToClaims(user));
  let authUser = {
    userId: user.userId,
    name: user.name,
    familyId: user.familyId,
    family: user.family,
    lastname: user.lastname,
    roles: rolesToClaims(user),
    token: token,
  };
  return authUser;
};

const getUser = async function (email) {
  let filter = {
    include: {
      model: dbModels.Families,
      as: "family",
    },
    where: { email: email },
  };
  let anUser = await dbModels.Users.findOne(filter);

  if (!anUser) {
    console.log(
      `[service: logic-login] [function: getUser] [type:W] [data: user not exists ${JSON.stringify(filter)}]`
    );
    throw new ElementNotFoundException(messageBinder().notFound);
  }
  return anUser;
};

module.exports = {
  login,
  create,
  setDbModels,
};
