const { toNumberOrExeption } = require("../../common/number-validate");

const extract = (req) => {
  let limit = toNumberOrExeption(req.query.limit, `limit query parameter must be present.`);
  let offset = toNumberOrExeption(req.query.offset, `offset query parameter must be present.`);
  let name = req.query.name;
  let billsLimit = req.query.billsLimit;
  let description = req.query.description;
  let familyId = req.familyId;

  const filter = {
    limit: limit,
    offset: offset,
    name: name,
    billsLimit: billsLimit,
    description: description,
    familyId: familyId,
    inactivefilter: Number(req.query.inactivefilter),
  };
  return filter;
};

module.exports = {
  extract,
};
