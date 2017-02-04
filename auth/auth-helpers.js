const bcrypt = require('bcryptjs');

const models = require('../db/models/index');

function comparePass(userPassword, databasePassword) {
  return bcrypt.compareSync(userPassword, databasePassword);
}

function createUser(req, res) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);

  return models.User.create({
    username: req.body.username,
    password: hash,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    dob: req.body.dob,
    age: req.body.age,
    zipcode: req.body.zipcode,
    gender: req.body.gender,
    videoURL: req.body.videoURL
  });
}

function createUserPref(req, res) {
  return models.Preferences.create({
    user_id: req.params.id,
    gender: req.body.gender,
    distance: req.body.distance,
    age_min: req.body.ageMin,
    age_max: req.body.ageMax
  });
}

function loginRequired(req, res, next) {
  if (!req.user) res.redirect('/auth/login');

  return next();
}

function loginRedirect(req, res, next) {
  if (req.user) res.redirect('/user');

  return next();
}


module.exports = {
  comparePass,
  loginRedirect,
  loginRequired,
  createUser,
  createUserPref
}
