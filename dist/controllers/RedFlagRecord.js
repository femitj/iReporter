'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _incident = require('../models/incident');

var _incident2 = _interopRequireDefault(_incident);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RedFlagRecord = {
    create: function create(req, res) {
        if (!req.body.type && !req.body.comment && !req.body.location) {
            return res.status(400).send({ 'message': 'All fields are required' });
        }
        var redFlagRecord = _incident2.default.create(req.body);
        return res.status(201).send(redFlagRecord);
    },
    getAll: function getAll(req, res) {
        var redFlagRecords = _incident2.default.findAll();
        return res.status(200).send(redFlagRecords);
    },
    getOne: function getOne(req, res) {
        var redFlagRecord = _incident2.default.findOne(req.params.id);
        if (!redFlagRecord) {
            return res.status(404).send({ 'message': 'red flag record not found' });
        }
        return res.status(200).send(redFlagRecord);
    },
    update: function update(req, res) {
        var redFlagRecord = _incident2.default.findOne(req.params.id);
        if (!redFlagRecord) {
            return res.status(404).send({ 'message': 'red flag record not found' });
        }
        var updatedRedFlagRecord = _incident2.default.update(req.params.id, req.body);
        return res.status(200).send(updatedRedFlagRecord);
    },
    delete: function _delete(req, res) {
        var redFlagRecord = _incident2.default.findOne(req.params.id);
        if (!redFlagRecord) {
            return res.status(404).send({ 'message': 'red flag record not found' });
        }
        var ref = _incident2.default.delete(req.params.id);
        return res.status(204).send(ref);
    }
};

exports.default = RedFlagRecord;