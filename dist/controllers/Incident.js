"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require("../models/index");

var _index2 = _interopRequireDefault(_index);

var _Helper = require("../helpers/Helper");

var _Helper2 = _interopRequireDefault(_Helper);

var _fs = require("fs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Incident = function () {
  function Incident() {
    _classCallCheck(this, Incident);
  }

  _createClass(Incident, null, [{
    key: "create",
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var createQuery, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                createQuery = "INSERT INTO\n  incidents(type, comment, location, status, createdBy, createdOn)\n  VALUES($1, $2, $3, $4, $5, $6)\n  returning *";
                values = [req.body.type, req.body.comment, req.body.location, req.body.status, req.user.id, req.body.createdOn];
                _context.prev = 2;
                _context.next = 5;
                return _index2.default.query(createQuery, values);

              case 5:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt("return", res.status(201).send({
                  status: 201,
                  data: [{
                    id: rows[0].id,
                    message: 'Created Incident record'
                  }]
                }));

              case 10:
                _context.prev = 10;
                _context.t0 = _context["catch"](2);
                return _context.abrupt("return", res.status(400).send(_context.t0));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[2, 10]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()
  }, {
    key: "get",
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var text, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = 'SELECT * FROM incidents WHERE id = $1 AND createdBy = $2';
                _context2.prev = 1;
                _context2.next = 4;
                return _index2.default.query(text, [req.params.id, req.user.id]);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt("return", res.status(404).send({ 'message': 'incident not found' }));

              case 8:
                return _context2.abrupt("return", res.status(200).send({
                  status: 200,
                  data: [{
                    data: rows[0]
                  }]
                }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2["catch"](1);
                return _context2.abrupt("return", res.status(400).send(_context2.t0));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 11]]);
      }));

      function get(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return get;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var getAllIncident, _ref6, rows, rowCount;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                getAllIncident = 'SELECT * FROM incidents where createdBy = $1';
                _context3.prev = 1;
                _context3.next = 4;
                return _index2.default.query(getAllIncident, [req.user.id]);

              case 4:
                _ref6 = _context3.sent;
                rows = _ref6.rows;
                rowCount = _ref6.rowCount;
                return _context3.abrupt("return", res.status(200).send({
                  status: 200,
                  data: [{
                    data: rows
                  }]
                }));

              case 10:
                _context3.prev = 10;
                _context3.t0 = _context3["catch"](1);
                return _context3.abrupt("return", res.status(400).send(_context3.t0));

              case 13:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 10]]);
      }));

      function getAll(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "updateLocation",
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var updateLocationQuery, values, _ref8, rows;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                updateLocationQuery = "UPDATE incidents SET location = $3 WHERE id = $1 AND createdBy = $2 AND status = $4\n  returning *";
                values = [req.body.id, req.user.id, req.body.location, 'draft'];
                _context4.prev = 2;
                _context4.next = 5;
                return _index2.default.query(updateLocationQuery, values);

              case 5:
                _ref8 = _context4.sent;
                rows = _ref8.rows;
                return _context4.abrupt("return", res.status(201).send({
                  status: 201,
                  data: [{
                    id: rows[0].id,
                    message: 'Updated Incident Records Location'
                  }]
                }));

              case 10:
                _context4.prev = 10;
                _context4.t0 = _context4["catch"](2);
                return _context4.abrupt("return", res.status(400).send(_context4.t0));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, this, [[2, 10]]);
      }));

      function updateLocation(_x7, _x8) {
        return _ref7.apply(this, arguments);
      }

      return updateLocation;
    }()
  }, {
    key: "updateComment",
    value: function () {
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var updateCommentQuery, values, _ref10, rows;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                updateCommentQuery = "UPDATE incidents SET comment = $4 WHERE id = $1 AND createdBy = $2 AND status = $3\n    returning *";
                values = [req.body.id, req.user.id, 'draft', req.body.comment];
                _context5.prev = 2;
                _context5.next = 5;
                return _index2.default.query(updateCommentQuery, values);

              case 5:
                _ref10 = _context5.sent;
                rows = _ref10.rows;
                return _context5.abrupt("return", res.status(201).send({
                  status: 201,
                  data: [{
                    id: rows[0].id,
                    message: 'Updated Incident Records Comment'
                  }]
                }));

              case 10:
                _context5.prev = 10;
                _context5.t0 = _context5["catch"](2);
                return _context5.abrupt("return", res.status(400).send(_context5.t0));

              case 13:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, this, [[2, 10]]);
      }));

      function updateComment(_x9, _x10) {
        return _ref9.apply(this, arguments);
      }

      return updateComment;
    }()
  }, {
    key: "delete",
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6(req, res) {
        var deleteQuery, _ref12, rows;

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                deleteQuery = 'DELETE FROM incidents WHERE id=$1 AND createdBy = $2 returning *';
                _context6.prev = 1;
                _context6.next = 4;
                return _index2.default.query(deleteQuery, [req.params.id, req.user.id]);

              case 4:
                _ref12 = _context6.sent;
                rows = _ref12.rows;

                if (rows[0]) {
                  _context6.next = 8;
                  break;
                }

                return _context6.abrupt("return", res.status(404).send({ 'message': 'incident not found' }));

              case 8:
                return _context6.abrupt("return", res.status(204).send({
                  status: 204,
                  data: [{
                    id: rows[0].id,
                    message: 'Incident record has been deleted'
                  }]
                }));

              case 11:
                _context6.prev = 11;
                _context6.t0 = _context6["catch"](1);
                return _context6.abrupt("return", res.status(400).send(_context6.t0));

              case 14:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, this, [[1, 11]]);
      }));

      function _delete(_x11, _x12) {
        return _ref11.apply(this, arguments);
      }

      return _delete;
    }()
  }]);

  return Incident;
}();

exports.default = Incident;