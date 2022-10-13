const { Op } = require("sequelize");

const pepareFilters = (requestFilter) => {
  let limit = {};
  let skip = {};

  let filter = {};
  filter["skip"] = +process.env.PAGING_DEFAULT_RECORD_OFFSET;
  filter["limit"] = +process.env.PAGING_DEFAULT_RECORD_LIMIT;

  if (requestFilter.hasOwnProperty("limit") && requestFilter.limit) {
    filter["limit"] =
      requestFilter.limit <= +process.env.PAGING_DEFAULT_MAX_RECORD_LIMIT
        ? +requestFilter.limit
        : +process.env.PAGING_DEFAULT_RECORD_LIMIT;
  }

  if (requestFilter.hasOwnProperty("offset") && requestFilter.offset) {
    filter["skip"] = requestFilter.offset;
  }

  let where = {};

  if (
    requestFilter.hasOwnProperty("fromDate") &&
    requestFilter.fromDate &&
    requestFilter.hasOwnProperty("toDate") &&
    requestFilter.toDate
  ) {
    where = { date: { $gte: requestFilter.fromDate, $lt: requestFilter.toDate } };
  }

  filter.where = where;
  console.log(`filter ${JSON.stringify(filter)}`);

  return filter;
};

module.exports = {
  pepareFilters,
};
