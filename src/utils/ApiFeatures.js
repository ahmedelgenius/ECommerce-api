class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  paginate() {
    console.log(this.queryString);
    let page = this.queryString.page * 1 || 1;
    if (page < 0) {
      page = 1;
    }
    let limit = 5;
    let skip = (page - 1) * limit;
    this.mongooseQuery.skip(skip).limit(limit);
    this.page = page;
    return this;
  }

  filter() {
    let queryString = { ...this.queryString };
    let excludedQuery = ["page", "sort", "keyword", "fields"];
    excludedQuery.forEach((elem) => {
      delete queryString[elem];
    });
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );
    queryString = JSON.parse(queryString);
    this.mongooseQuery.find(queryString);
    return this;
  }

  sort() {
    if (this.queryString.sort) {
      let sortedBy = this.queryString.sort.replace(",", " ");
      this.mongooseQuery.sort(sortedBy);
    }
    return this;
  }

  search() {
    if (this.queryString.keyword) {
      let keyword = this.queryString.keyword;
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      });
      return this;
    }
  }
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.replace(",", " ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
}

module.exports = ApiFeatures;
