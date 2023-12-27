const {
  Router
} = require("express");
const adminMiddleware = require("../middleware/admin");
const {
  Admin,
  Course
} = require("../db/index");
const router = Router();

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