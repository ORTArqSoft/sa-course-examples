const { toNumberOrExeption } = require("../../common/number-validate");

const extract = (req) => {
  let limit = toNumberOrExeption(req.query.limit, `limit query parameter must be present`);
  let offset = toNumberOrExeption(req.query.offset, `offset query parameter must be present`);
  let amount = req.query.amount;
  let categoryId = req.query.categoryId;
  let fromDate = req.query.fromDate;
  let toDate = req.query.toDate;
  let description = req.query.description;
  let userId = req.query.userId;
  let familyId = req.familyId;

  const filter = {
    limit: limit,
    offset: offset,
    amount: amount,
    categoryId: categoryId,
    fromDate: fromDate,
    toDate: toDate,
    description: description,
    userId: userId,
    familyId: familyId,
  };
  return filter;
};

module.exports = {
  extract,
};
