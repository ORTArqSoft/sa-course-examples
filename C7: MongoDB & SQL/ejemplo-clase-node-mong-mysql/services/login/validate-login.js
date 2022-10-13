const { messageBinder } = require("../login/locale/locale-binder");
const { ElementInvalidException } = require("../../exceptions/exceptions");

const validateCredentials = async (credentials) => {
  if (!credentials) {
    console.log(
      `[service: validate-login] [function: validateCredentials] [type:] [data: Credentials does not have any property]`
    );
    throw new ElementInvalidException(messageBinder().invalidCredentials);
  }

  if (!credentials.hasOwnProperty("email")) {
    console.log(
      `[service: validate-login] [function: validateCredentials] [type:W] [data: Credentials does not have email property]`
    );
    throw new ElementInvalidException(messageBinder().invalidCredentials);
  }

  if (!credentials.email) {
    console.log(
      `[service: validate-login] [function: validateCredentials] [type:W] [data: Credentials does not have valid value for email property]`
    );
    throw new ElementInvalidException(messageBinder().invalidCredentials);
  }

  if (!credentials.hasOwnProperty("password")) {
    console.log(
      `[service: validate-login] [function: validateCredentials] [type:W] [data: Credentials does not have password property]`
    );
    throw new ElementInvalidException(messageBinder().invalidCredentials);
  }

  if (!credentials.password) {
    console.log(
      `[service: validate-login] [function: validateCredentials] [type:W] [data: Credentials does not have password property]`
    );
    throw new ElementInvalidException(messageBinder().invalidCredentials);
  }
};

module.exports = {
  validateCredentials,
};
