const { throwExeptionIfEmptyString } = require("../../common/string-validate");
const { throwExeptionIfUndefined } = require("../../common/object-validate");
const { throwExeptionIfNotHasProperty } = require("../../common/object-validate");
const { throwExeptionIfDateInvalid } = require("../../common/date-validate");
const { toNumberOrExeption } = require("../../common/number-validate");
const { messageBinder } = require("./locale/locale-binder");

const validate = (bill) => {
  throwExeptionIfUndefined(bill, messageBinder().billIsMissing);
  throwExeptionIfNotHasProperty(bill, "category", messageBinder().categoryIdIsMissing);

  throwExeptionIfNotHasProperty(bill, "description", messageBinder().descriptionIsMissing);
  throwExeptionIfEmptyString(bill.description, messageBinder().descriptionIsMissing);

  throwExeptionIfNotHasProperty(bill, "date", messageBinder().dateIsMissing);
  throwExeptionIfDateInvalid(bill.date, messageBinder().dateIsMissing);

  throwExeptionIfNotHasProperty(bill, "amount", messageBinder().amountAreMissing);
  toNumberOrExeption(bill.amount, messageBinder().amountAreMissing);

  throwExeptionIfNotHasProperty(bill, "family", messageBinder().userIdIsMissing);
};

module.exports = {
  validate,
};
