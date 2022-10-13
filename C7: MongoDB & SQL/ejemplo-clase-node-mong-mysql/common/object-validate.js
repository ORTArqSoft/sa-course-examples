const { ElementInvalidException } = require("../exceptions/exceptions");

const throwExeptionIfNotHasProperty = function (object, property, message) {
  throwExeptionIfUndefined(object, message);
  if (!object.hasOwnProperty(property)) {
    throw new ElementInvalidException(message);
  }
};

const throwExeptionIfUndefined = function (object, message) {
  if (!object) {
    throw new ElementInvalidException(message);
  }
};

module.exports = {
  throwExeptionIfNotHasProperty,
  throwExeptionIfUndefined,
};
