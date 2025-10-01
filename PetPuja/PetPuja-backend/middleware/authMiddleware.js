const jwt = require("jsonwebtoken");
const authmiddleware = (req, resp, next) => {
  const a = req.header.authorization;
  const array = a.split(" ");
  const token = array[1];

  const decoded = jwt.verify(token, "SECRET_KEY");
  req.user=decoded
  next()
};

module.exports = authmiddleware;
