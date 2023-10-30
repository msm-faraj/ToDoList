const reqHandler = (routeHandler) => {
  return (req, res, next) => routeHandler(req, res, next).catch(next);
};

module.exports = reqHandler;
