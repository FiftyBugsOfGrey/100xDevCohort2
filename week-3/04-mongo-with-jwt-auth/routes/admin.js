const {
  Router
} = require("express");
const jwt = require('jsonwebtoken');

const adminMiddleware = require("../middleware/admin");
const {
  Admin,
  Course
} = require("../db/index");
const router = Router();
const jwtPassword = 'secret123456';


router.post('/signup', (req, res) => {
  let {
    username,
    password
  } = req.body;
  const newAdmin = new Admin({
    username,
    password
  });
  newAdmin.save().then(() => {
    res.json({
      message: 'Admin created successfully'
    })
  }).catch(() => {
    res.sendStatus(500)
  })
});


router.post('/signin', (req, res) => {
  let {
    username,
    password
  } = req.body;
  const admin = Admin.where({
    username,
    password
  });
  admin.findOne().then(user => {
    if (user) {
      let token = jwt.sign({
        username
      }, jwtPassword);
      res.json({
        token
      })
    } else {
      return res.status(401).send('unauthorised')
    }
  })

});


router.post('/courses', adminMiddleware, (req, res) => {
  let {
    title,
    description,
    price,
    imageLink
  } = req.body;

  const newCourse = new Course({
    title,
    description,
    price,
    imageLink
  });

  newCourse.save().then((course) => {
    res.json({
      message: 'course created successfully',
      courseId: course._id
    })
  })

});

router.get('/courses', adminMiddleware, (req, res) => {
  Course.find({}).then(courses => {
    res.json(courses)
  });
});

module.exports = router;