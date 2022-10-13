const pepareFilters = (requestFilter) => {
  let filter = {
    offset: +process.env.PAGING_DEFAULT_RECORD_OFFSET,
    limit: +process.env.PAGING_DEFAULT_RECORD_LIMIT,
  };

  if (requestFilter.hasOwnProperty("limit") && requestFilter.limit) {
    filter.limit =
      requestFilter.limit <= +process.env.PAGING_DEFAULT_MAX_RECORD_LIMIT
        ? +requestFilter.limit
        : +process.env.PAGING_DEFAULT_RECORD_LIMIT;
  }

  if (requestFilter.hasOwnProperty("offset") && requestFilter.offset) {
    filter.offset = requestFilter.offset;
  }
  let where = {};
  if (requestFilter.hasOwnProperty("name") && requestFilter.name) {
    where.name = requestFilter.name;
  }

  if (requestFilter.hasOwnProperty("email") && requestFilter.email) {
    where.email = requestFilter.email;
  }

  if (requestFilter.hasOwnProperty("familyId") && requestFilter.familyId) {
    where.familyId = requestFilter.familyId;
  }

  filter.where = where;
  return filter;
};

module.exports = {
  pepareFilters,
};
