'use strict';

var chai = require('chai');
var server = require('../server'); // Our app

chai.use(require('chai-http'));
var should = chai.should();

var redFlagDetails = {
  "type": "red-flag",
  "comment": "thief",
  "location": "obanikoro"
};

describe('API task route', function () {
  describe('GET /tasks', function () {
    it('returns a object message', function (done) {
      chai.request(server).get('/api/v1').end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });

  // Testing the save task expecting status 201 of success
  describe('POST /record', function () {
    it('saves a new record', function (done) {
      chai.request(server).post('/api/v1/red-flags').send({
        type: 'red-flag',
        location: 'ikeja',
        comment: 'this is a comment'
      }).end(function (err, res) {
        res.should.have.status(201);
        done(err);
      });
    });
  });

  describe('GET All /record', function () {
    it('gets all record', function (done) {
      chai.request(server).get('/api/v1/red-flags').end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('GET /record/:id', function () {
    // Testing how to find a task by id
    it('returns a record by id', function (done) {
      var redFlag = server('redFlagRecord').findOne();
      chai.request(server).get('/api/v1/red-flags:id' + redFlag.id).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });

  describe('PUT /record', function () {
    it('updates record', function (done) {
      chai.request(server).put('/api/v1/red-flags').send({
        type: 'red-flag',
        location: 'ikeja',
        comment: 'this is a comment'
      }).end(function (err, res) {
        res.should.have.status(201);
        done(err);
      });
    });
  });

  describe('DELETE record/:id', function () {
    // Testing how to find a task by id
    it('deletes record by id', function (done) {
      var redFlag = server('redFlagRecord').findOne();
      chai.request(server).delete('/api/v1/red-flags:id' + redFlag.id).end(function (err, res) {
        res.should.have.status(200);
        done();
      });
    });
  });
});