'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../controllers/User');

var _User2 = _interopRequireDefault(_User);

var _Incident = require('../controllers/Incident');

var _Incident2 = _interopRequireDefault(_Incident);

var _userHelper = require('../helpers/userHelper');

var _userHelper2 = _interopRequireDefault(_userHelper);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

//USER ROUTES
// add a user
router.post('/api/v1/auth/users', _userHelper2.default, _User2.default.create);
// login a user
router.post('/api/v1/auth/login', _userHelper2.default, _User2.default.login);

//INTERVENTION ROUTE
// create intervention
router.post('/api/v1/incidents', _Auth2.default.verifyToken, _Incident2.default.create);
// get a specific incident:id
router.get('/api/v1/incidents/:id', _Auth2.default.verifyToken, _Incident2.default.get);
// get ALL incident
router.get('/api/v1/incidents', _Auth2.default.verifyToken, _Incident2.default.getAll);
// update location
router.patch('/api/v1/incidents/:id/location', _Auth2.default.verifyToken, _Incident2.default.updateLocation);
//update comment
router.patch('/api/v1/incidents/:id/comment', _Auth2.default.verifyToken, _Incident2.default.updateComment);
//delete a specific incident
router.delete('/api/v1/incidents/:id', _Auth2.default.verifyToken, _Incident2.default.delete);

module.exports = router;