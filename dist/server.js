'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _redFlagRecord = require('./routes/redFlagRecord');

var _redFlagRecord2 = _interopRequireDefault(_redFlagRecord);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();
var PORT = process.env.PORT || 8080;

app.use(_express2.default.json());
app.use('/', _express2.default.static('UI'));

app.get('/api/v1', function (req, res) {
    return res.status(200).send({ 'message': 'YAY! Congratulations! Your first endpoint is working' });
});
app.use(_redFlagRecord2.default);

var server = app.listen(PORT, function () {
    console.log('server running on port ' + PORT);
});

module.exports = server;