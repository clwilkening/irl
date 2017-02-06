var express = require('express');
var router = express.Router();
const passport = require('../auth/local');
var models = require('../db/models/index');
const authHelpers = require('../auth/auth-helpers');


/* GET home page. */
// router.get('/',  (req, res, next)=> {
//   models.User.findAll({}).then(function(users) {
//     res.render('profiles/profiles', {
//       title: 'users',
//       users: users
//     });
//   });
// });

router.get('/home/:id',  authHelpers.getProfiles, (req, res, next)=> {
console.log('WHAT IS PROFILES =======   ' + JSON.stringify(res.locals.profiles))
console.log('WHAT IS REQ.USER.DATAVALUES =======   ' + JSON.stringify(req.user.dataValues))

// Get user preferences
models.Preferences.findOne({
  where: { user_id: req.params.id }
}).then((user) => {
  console.log('HERESDAUSER====+++++ ' + JSON.stringify(user));
  models.User.findAll({
    order: [
    ['age', 'ASC'],
  ],
  where: {
  age: {$between: [user.age_min, user.age_max] }, //req.body.age_min, req.user.age_min, req.user.dataValues.age_min, models.User.dataValues.age_min
  }
  })
   .then(function(users) {
    console.log('WHERE DA USERS AT +++++ ' + JSON.stringify(users))
    //console.log(arr)
      res.render('profiles/profiles', {
        title: 'users',
        users: users
        // profiles: profiles,
        //profiles: res.user.dataValues
     })
      //console.log('TRYING TO FIND THE AGE  ++++   ' + users)
  })
  })

 });



// router.get('/messages/:id',  authHelpers.getMessages, (req, res, next)=> {
//  models.Messages.findAll({
// order: [
//   ['toUser', 'DESC'],
//  ],
//  where: {
//  fromUser: {$eq: req.params.id},
//  }
//  }).then(function(messages, username) {
//    res.render('user/messages', {
//       content: 'content',
//        messages: messages,
//        fromUser: 'fromUser',
//        toUser: 'toUser',
//      username: req.user.dataValues
//    });
//  });
// });

router.get('/:id', function(req, res, next) {
  models.User.findById(req.params.id).then(function(user) {
    res.render('profiles/profile', { user: user });
  });
});

module.exports = router;

