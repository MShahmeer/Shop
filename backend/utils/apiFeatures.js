class APIfeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  search() {
    const keyword = this.queryString.keyword
      ? {
          name: {
            $regex: this.queryString.keyword,
            $options: "i", //i means case insensitive
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    //make the copy of the query string
    const queryCopy = { ...this.queryString };
    //console.log(queryCopy);
    //removing fields from query
    const removeFields = ["keyword", "limit", "page"];
    removeFields.forEach((el) => delete queryCopy[el]); //by this it will remove the keyword from our query
    //console.log("queryCopy");

    //advanced filters for price etc
    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace()



    this.query = this.query.find(queryCopy)
    return this; //http://localhost:4000/api/v1/products?keyword=sandisk&category=Electronics
  }

  pagination(resultsPerPage){
    let currentPage = Number(this.queryString.page) || 1;
    let skip = resultsPerPage * (currentPage - 1)//database has 30 products on page 1 ten are displayed, for 2nd page we have to skip first 10 products, and for third page we will have to skip first 20 products so that last 10 should be displayed


    this.query = this.query.limit(resultsPerPage).skip(skip);
    return this;
  }
}

module.exports = APIfeatures;
