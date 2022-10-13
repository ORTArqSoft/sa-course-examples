const { toNumberOrExeption } = require("../../common/number-validate");
const { thrrowErrorIfNotValidEmail } = require("../../common/string-validate");
const { throwExeptionIfEmptyString } = require("../../common/string-validate");
const { throwExeptionIfUndefined } = require("../../common/object-validate");
const { throwExeptionIfNotHasProperty } = require("../../common/object-validate");
const { messageBinder } = require("./locale/locale-binder");

const validate = (user) => {
  throwExeptionIfUndefined(user, messageBinder().userIsMissing);

  throwExeptionIfNotHasProperty(user, "name", messageBinder().nameIsMissing);
  throwExeptionIfEmptyString(user.name, messageBinder().nameIsMissing);
  /*
  throwExeptionIfNotHasProperty(user, "email", messageBinder().emailIsMissing);
  throwExeptionIfEmptyString(user.email, messageBinder().emailIsMissing);
  thrrowErrorIfNotValidEmail(user.email, messageBinder().invalidEmailFormat);

  throwExeptionIfNotHasProperty(user, "isAdministrator", messageBinder().isAdministratorIsMissing);
  toNumberOrExeption(user.isAdministrator, messageBinder().isAdministratorIsMissing);

  throwExeptionIfNotHasProperty(user, "familyId", messageBinder().familyIdIsMissing);
  toNumberOrExeption(user.familyId, messageBinder().familyIdIsMissing);
  */
};

module.exports = {
  validate,
};
