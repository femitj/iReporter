'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Incident = function () {
    function Incident() {
        _classCallCheck(this, Incident);

        this.incidents = [];
    }

    _createClass(Incident, [{
        key: 'create',
        value: function create(data) {
            var newIncident = {
                id: _uuid2.default.v4(),
                createdOn: _moment2.default.now(),
                type: data.type || '',
                location: data.location || '',
                status: data.status || '',
                comment: data.comment || '',
                modifiedDate: _moment2.default.now()
            };

            this.incidents.push(newIncident);
            return newIncident;
        }
    }, {
        key: 'findAll',
        value: function findAll() {
            return this.incidents;
        }
    }, {
        key: 'findOne',
        value: function findOne(id) {
            return this.incidents.find(function (incident) {
                return incident.id === id;
            });
        }
    }, {
        key: 'update',
        value: function update(id, data) {
            var incident = this.findOne(id);
            var index = this.incidents.indexOf(incident);
            this.incidents[index].type = data['type'] || incident.type;
            this.incidents[index].location = data['location'] || incident.location;
            this.incidents[index].status = data['status'] || incident.status;
            this.incidents[index].comment = data['comment'] || incident.comment;
            this.incidents[index].modifiedDate = _moment2.default.now();
            return this.incidents[index];
        }
    }, {
        key: 'delete',
        value: function _delete(id) {
            var incident = this.findOne(id);
            var index = this.incidents.indexOf(incident);
            this.incidents.splice(index, 1);
            return {};
        }
    }]);

    return Incident;
}();

exports.default = new Incident();