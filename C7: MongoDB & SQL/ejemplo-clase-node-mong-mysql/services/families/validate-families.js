const { throwExeptionIfEmptyString } = require("../../common/string-validate");
const { throwExeptionIfUndefined } = require("../../common/object-validate");
const { throwExeptionIfNotHasProperty } = require("../../common/object-validate");
const { messageBinder } = require("./locale/locale-binder");

const validate = (family) => {
  throwExeptionIfUndefined(family, messageBinder().familyIsMissing);
  throwExeptionIfNotHasProperty(family, "name", messageBinder().nameIsMissing);
  throwExeptionIfEmptyString(family.name, messageBinder().nameIsMissing);
  throwExeptionIfNotHasProperty(family, "API_KEY", messageBinder().apiKeyIsMissing);
  throwExeptionIfEmptyString(family.API_KEY, messageBinder().apiKeyIsMissing);
};

module.exports = {
  validate,
};
