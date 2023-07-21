const jwt = require("jsonwebtoken")
const TOKEN_SECRET = "32D"

module.exports = function(req, res, next) {
  const token = req.header("auth_token")
  if (!token) return res.status(401).send("Access Denied")

  try {
    const verified = jwt.verify(token, TOKEN_SECRET)
    next()
  } catch (error) {
    if (error.name == "TokenExpiredError") {
      res.status(400).send("Unauthorized! Access Token was expired")
    } else {
      res.status(400).send("Invalid Token")
      console.log(error.message)
    }
  }
}