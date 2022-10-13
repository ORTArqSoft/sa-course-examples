const HttpErrorCodes = {
  ERROR_404_NOT_FOUND: 404,
  ERROR_400_BAD_REQUEST: 400,
  ERROR_401_UNAUTHORIZED: 401,
  ERROR_403_FORBIDDEN: 403,
  ERROR_409_CONFLICT: 409,
  ERROR_500_SERVER_ERROR: 500,
  HTTP_200_OK: 200,
};

const ErrorMessages = {
  ELEMENT_NOT_EXIST: "No existe el elemento",
  INVALID_DATA: "Elementos invalidos",
  OK: "OK",
};

class ElementNotFoundException extends Error {
  constructor(message) {
    super(message);
  }
}

class ElementInvalidException extends Error {
  constructor(message) {
    super(message);
  }
}

class InvalidCredentials extends Error {
  constructor(message) {
    super(message);
  }
}

class ElementAllreadyExist extends Error {
  constructor(message) {
    super(message);
  }
}

class ConflictWithElements extends Error {
  constructor(message) {
    super(message);
  }
}

const evalException = function (err, res) {
  if (err instanceof ElementInvalidException) {
    return res.status(HttpErrorCodes.ERROR_400_BAD_REQUEST).send(err.message);
  } else if (err instanceof ElementNotFoundException) {
    return res.status(HttpErrorCodes.ERROR_404_NOT_FOUND).send(err.message);
  } else if (err instanceof InvalidCredentials) {
    return res.status(HttpErrorCodes.ERROR_401_UNAUTHORIZED).send(err.message);
  } else if (err instanceof ConflictWithElements) {
    return res.status(HttpErrorCodes.ERROR_409_CONFLICT).send(err.message);
  } else if (err instanceof ElementAllreadyExist) {
    return res.status(HttpErrorCodes.ERROR_409_CONFLICT).send(err.message);
  } else {
    return res.status(HttpErrorCodes.ERROR_500_SERVER_ERROR).send(err.message);
  }
};

module.exports = {
  ElementInvalidException,
  ElementAllreadyExist,
  ElementNotFoundException,
  InvalidCredentials,
  ConflictWithElements,
  HttpErrorCodes,
  ErrorMessages,
  evalException,
};
