const {
  User
} = require("../db/index");

function userMiddleware(req, res, next) {
  let [username, password] = [req.header('username'), req.header('password')];
  const user = User.where({
    username,
    password
  });
  user.findOne().then(user => {
    if (user) {
      next();
    } else {
      return res.status(401).send('unauthorised')
    }
  })
}

module.exports = userMiddleware;