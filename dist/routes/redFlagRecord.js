'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _RedFlagRecord = require('../controllers/RedFlagRecord');

var _RedFlagRecord2 = _interopRequireDefault(_RedFlagRecord);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// create a red-flag record
router.post('/api/v1/red-flags', _RedFlagRecord2.default.create);

// get all red-flag record
router.get('/api/v1/red-flags', _RedFlagRecord2.default.getAll);

// get a specific red-flag record
router.get('/api/v1/red-flags/:id', _RedFlagRecord2.default.getOne);

// edit a specific red-flag record.
router.put('/api/v1/red-flags/:id', _RedFlagRecord2.default.update);

// delete a red-flag record
router.delete('/api/v1/red-flags/:id', _RedFlagRecord2.default.delete);

module.exports = router;