const jwt = require('jsonwebtoken');
const jwtPassword = 'secret123456';

function adminMiddleware(req, res, next) {
  let token = req.header('Authorization')?.split(' ')?.[1];
  try {
    const verified = jwt.verify(token, jwtPassword);
    req.body.username = verified.username;
    next()
  } catch (err) {

    res.sendStatus(500)
  }
}

module.exports = adminMiddleware;