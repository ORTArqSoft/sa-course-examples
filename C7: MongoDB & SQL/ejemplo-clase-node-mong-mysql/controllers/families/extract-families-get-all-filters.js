const { toNumberOrExeption } = require("../../common/number-validate");

const extract = (req) => {
  let limit = toNumberOrExeption(req.query.limit, `limit query parameter must be present`);
  let offset = toNumberOrExeption(req.query.offset, `offset query parameter must be present`);
  let name = req.query.name;
  let API_KEY = req.query.API_KEY;
  let familyId = req.familyId;

  const filter = {
    limit: limit,
    offset: offset,
    name: name,
    API_KEY: API_KEY,
    familyId: familyId,
  };
  return filter;
};

module.exports = {
  extract,
};
