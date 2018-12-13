'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _index = require('../models/index');

var _index2 = _interopRequireDefault(_index);

var _Helper = require('../helpers/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = {
  // Create User
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              hashPassword = _Helper2.default.hashPassword(req.body.password);
              createQuery = 'INSERT INTO\n      users (email, password, firstname, lastname, username)\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
              values = [req.body.email, hashPassword, req.body.firstname, req.body.lastname, req.body.username];
              _context.prev = 3;
              _context.next = 6;
              return _index2.default.query(createQuery, values);

            case 6:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _Helper2.default.generateToken(rows[0].id);
              return _context.abrupt('return', res.status(201).send({
                status: 201,
                data: [{
                  token: token,
                  user: rows
                }]
              }));

            case 12:
              _context.prev = 12;
              _context.t0 = _context['catch'](3);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 16;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ 'message': 'User with that EMAIL already exist' }));

            case 16:
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 17:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[3, 12]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }(),
  login: function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
      var text, _ref4, rows, token;

      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              text = 'SELECT * FROM users WHERE email = $1';
              _context2.prev = 1;
              _context2.next = 4;
              return _index2.default.query(text, [req.body.email]);

            case 4:
              _ref4 = _context2.sent;
              rows = _ref4.rows;

              if (rows[0]) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ 'message': 'The email you provided is incorrect' }));

            case 8:
              if (_Helper2.default.comparePassword(rows[0].password, req.body.password)) {
                _context2.next = 10;
                break;
              }

              return _context2.abrupt('return', res.status(400).send({ 'message': 'The password you provided is incorrect' }));

            case 10:
              token = _Helper2.default.generateToken(rows[0].id);
              return _context2.abrupt('return', res.status(200).send({
                status: 201,
                data: [{
                  token: token,
                  user: rows
                }]
              }));

            case 14:
              _context2.prev = 14;
              _context2.t0 = _context2['catch'](1);
              return _context2.abrupt('return', res.status(400).send(_context2.t0));

            case 17:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[1, 14]]);
    }));

    function login(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return login;
  }()
};

exports.default = User;