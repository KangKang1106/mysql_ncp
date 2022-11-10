// TODO: 컨트롤러 코드
const User = require('../model/User');

exports.main = (req, res) => {
  res.render('index');
};

exports.signup = (req, res) => {
  res.render('signup');
};

exports.signin = (req, res) => {
  res.render('signin');
};

exports.postSignup = (req, res) => {
  console.log(req.body);
  User.postSignup(req.body, (result) => {
    console.log(result);
    res.send({
      userid: req.body.userid,
      name: req.body.name,
      pw: req.body.pw,
    });
  });
};

exports.postSignin = (req, res) => {
  User.postSignin(req.body, (result) => {
    if (result == undefined) {
      res.send(false);
    } else {
      res.send(true);
    }
  });
};

exports.postProfile = (req, res) => {
  User.postProfile(req.body.userid, (result) => {
    if (result.length > 0) {
      res.render('profile', {data: result[0]});
    } else {
      res.redirect('/user/signin');
    }
  });
};

exports.editProfile = (req, res) => {
  User.editProfile(req.body, () => {
    res.send();
  });
};

exports.deleteProfile = (req, res) => {
  User.deleteProfile(req.body.id, () => {
    res.redirect('/user/signin');
  });
};