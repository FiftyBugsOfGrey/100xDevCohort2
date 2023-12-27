const {
  Router
} = require("express");
const jwt = require('jsonwebtoken');
const router = Router();
const userMiddleware = require("../middleware/user");
const {
  User,
  Course
} = require("../db/index");
const jwtPassword = 'secret123456';

// User Routes
router.post('/signup', (req, res) => {
  let {
    username,
    password
  } = req.body;

  const newUser = new User({
    username,
    password
  });
  newUser.save().then(() => {
    res.json({
      message: 'User created successfully'
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
  const user = User.where({
    username,
    password
  });
  user.findOne().then(user => {
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

router.get('/courses', (req, res) => {
  Course.find({}).then(courses => {
    res.json(courses)
  });
});

router.post('/courses/:courseId', userMiddleware, (req, res) => {
  let {
    username,
  } = req.body;

  User.findOneAndUpdate({
    username
  }, {
    $push: {
      purchased: req.params.courseId
    }
  }).then((resolve, reject) => {
    res.json({
      message: 'course purchased successfully'
    })
  }).catch((error) => {
    res.sendStatus(500)
  })
});

router.get('/purchasedCourses', userMiddleware, (req, res) => {
  let username = req.body.username;
  User.findOne({
    username
  }).then(courses => {
    Course.find({
      _id: {
        $in: courses.purchased
      }
    }).then(courses => {
      res.json(courses)
    });
  }).catch((error) => {
    res.sendStatus(500)
  });
});

module.exports = router