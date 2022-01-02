module.exports = (func) => (req, res, next) => {
  console.log(Promise.resolve(func(req, res, next)).catch(next));
};
//not working