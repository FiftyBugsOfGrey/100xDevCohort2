const jwt = require('jsonwebtoken');
const jwtPassword = 'secret123456';

function userMiddleware(req, res, next) {
  let token = req.header('Authorization')?.split(' ')?.[1];
  try {
    const verified = jwt.verify(token, jwtPassword);
    req.body.username = verified.username;
    next()
  } catch (err) {
    return false;
  }
}

module.exports = userMiddleware;