const { ElementInvalidException } = require("../exceptions/exceptions");

const throwExeptionIfDateInvalid = function (property, message) {
  try {
    dateObj = new Date(property);
    if (isNaN(dateObj.getTime())) {
      throw new ElementInvalidException(`${message}`);
    }
    return dateObj;
  } catch (e) {
    throw new ElementInvalidException(`Invalid date ${e}`);
  }
};

module.exports = {
  throwExeptionIfDateInvalid,
};
