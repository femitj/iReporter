'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Helper = require('../helpers/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkUser = function checkUser(req, res, next) {
  var _req$body = req.body,
      email = _req$body.email,
      password = _req$body.password;


  if (!req.body.email || !req.body.password) {
    return res.status(400).send({ 'message': 'Some values are missing' });
  }

  if (!_Helper2.default.isValidEmail(req.body.email)) {
    return res.status(400).send({ 'message': 'Please enter a valid email address' });
  }

  return next();
};

exports.default = checkUser;