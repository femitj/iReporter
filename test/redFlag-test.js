const chai = require('chai');
const server = require('../src/server'); // Our app


chai.use(require('chai-http'));
let should = chai.should();

const redFlagDetails = {
		"type": "red-flag",
		"comment": "thief",
		"location": "obanikoro"   
};


describe('API task route', function() {
  describe('GET /tasks', function() {
    it('returns a object message', function(done) {
      chai.request(server)
        .get('/api/v1')
        .end(function(err, res){
          res.should.have.status(200);
          done();
        });
      });
    });

  // Testing the save task expecting status 201 of success
  describe('POST /record', function() {
    it('saves a new record', function(done) {
        chai.request(server)
            .post('/api/v1/red-flags')
            .send({
                type: 'red-flag',
                location: 'ikeja',
                comment: 'this is a comment'
            })
            .end(function(err, res) {
              res.should.have.status(201);
              res.body.should.have.property('type');
              res.body.should.have.property('location');
              res.body.should.have.property('comment');
              res.body.should.have.property('id');  
              done(err);
            });
      });
  });

  describe('GET All /record', function(){
    it('gets all record', function(done){
      chai.request(server)
        .get('/api/v1/red-flags')
        .end(function(err,res){
          res.should.have.status(200);
          done();
        });
    });
  });


});

