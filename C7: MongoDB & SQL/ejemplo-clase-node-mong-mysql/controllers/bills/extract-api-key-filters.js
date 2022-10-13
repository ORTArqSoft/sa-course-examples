const { toNumberOrExeption } = require("../../common/number-validate");
const { throwExeptionIfDateInvalid } = require("../../common/date-validate");

const extractForApiKeyQueries = (req) => {
  let limit = toNumberOrExeption(req.query.limit, `limit query parameter must be present`);
  let offset = toNumberOrExeption(req.query.offset, `offset query parameter must be present`);
  let fromDate = throwExeptionIfDateInvalid(req.query.fromDate, `Form date is invalid or missing`);
  let toDate = throwExeptionIfDateInvalid(req.query.toDate, `To date is invalid or missing`);

  const filter = {
    limit: limit,
    offset: offset,
    fromDate: fromDate,
    toDate: toDate,
  };
  return filter;
};

module.exports = {
  extractForApiKeyQueries,
};
