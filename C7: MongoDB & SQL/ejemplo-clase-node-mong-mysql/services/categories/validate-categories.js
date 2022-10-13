const { throwExeptionIfEmptyString } = require("../../common/string-validate");
const { throwExeptionIfUndefined } = require("../../common/object-validate");
const { throwExeptionIfNotHasProperty } = require("../../common/object-validate");
const { toNumberOrExeption } = require("../../common/number-validate");
const { messageBinder } = require("./locale/locale-binder");

const validate = (category) => {
  throwExeptionIfUndefined(category, messageBinder().categoryIsMissing);
  throwExeptionIfNotHasProperty(category, "name", messageBinder().nameIsMissing);
  throwExeptionIfEmptyString(category.name, messageBinder().nameIsMissing);

  throwExeptionIfNotHasProperty(category, "description", messageBinder().descriptionIsMissing);
  throwExeptionIfEmptyString(category.description, messageBinder().descriptionIsMissing);

  throwExeptionIfNotHasProperty(category, "billsLimit", messageBinder().billsLimitIsMissing);
  toNumberOrExeption(category.billsLimit, messageBinder().billsLimitIsMissing);

  throwExeptionIfNotHasProperty(category, "familyId", messageBinder().familyIdIsMissing);
  toNumberOrExeption(category.familyId, messageBinder().familyIdMissing);
};

module.exports = {
  validate,
};
