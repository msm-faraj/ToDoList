module.exports = function (err, req, res, next) {
  // console.log("this is working");
  res.status(500).json({ message: err.message });
};
