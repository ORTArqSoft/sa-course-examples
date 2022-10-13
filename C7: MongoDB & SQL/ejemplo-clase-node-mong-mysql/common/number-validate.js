const { ElementInvalidException } = require("../exceptions/exceptions");

const toNumberOrExeption = function (val, message) {
  if (isNaN(val)) {
    throw new ElementInvalidException(message);
  }
  return Number(val);
};

const toNumberInRangeOrExeption = function (valForm, valTo, val, message) {
  toNumberOrExeption(valForm, message);
  toNumberOrExeption(valTo, message);
  toNumberOrExeption(val, message);
  if (Number(valForm) > Number(val) || Number(val) > Number(valFrom)) {
    throw new ElementInvalidException(message);
  }
  return Number(val);
};

module.exports = {
  toNumberOrExeption,
  toNumberInRangeOrExeption,
};
