const {
  Admin
} = require("../db/index");

function adminMiddleware(req, res, next) {
  let [username, password] = [req.header('username'), req.header('password')];

  const admin = Admin.where({
    username,
    password
  });
  admin.findOne().then(user => {
    if (user) {
      next();
    } else {
      return res.status(401).send('unauthorised')
    }
  })
}

module.exports = adminMiddleware;