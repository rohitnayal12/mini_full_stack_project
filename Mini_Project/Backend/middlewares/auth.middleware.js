const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (token) {
    const decoded = jwt.verify(token, "masai");
    if (decoded) {
     // console.log(decoded);
      req.body.userId=decoded.userId
      req.body.user=decoded.user
      next();
    } else {
      res.send({ err: "Invalid token....." });
    }
  }
  else{
    res.send({ err: "Login first....." });
  }
};

module.exports = {
  auth,
};
