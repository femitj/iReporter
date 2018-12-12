const chai = require('chai');
const server = require('../server'); // Our app
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
chai.should();

const redFlagDetails = {
    id:3,
		type: "red-flag",
		comment: "thief",
    location: "obanikoro",
    status: 'draft',
    images: ['Image, Image'],
    videos: ['Video, Video'],  
};

const updateL = {
  location: '7908990',
};

const updateC = {
  comment: 'bad-road',
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

  describe('GET /red-flags/:id', () => {
    it('should return a specific redflag', (done) => {
      chai.request(server)
        .get('/api/v1/red-flags')
        .end((err, res) => {
          if (err) throw err;
          res.status.should.equal(200);
          res.body.should.have.property('status');
          res.body.data.should.be.a('array');
          res.body.status.should.equal(200);
          done();
        });
    });
  });

  describe('POST /red-flags', () => {
    it('should create a redflag', (done) => {
      chai.request(server)
        .post('/api/v1/red-flags')
        .send(redFlagDetails)
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(201);
          res.body.should.have.property('status');
          done();
        });
    });
  });

  
  describe('PATCH /red-flags', () => {
    it('should update a redflag location', (done) => {
      chai.request(server)
        .patch('/api/v1/red-flags/1/location')
        .send(updateL)
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(404);
          done();
        });
    });
  });

  describe('PUT /red-flags', () => {
    it('should update a redflag comment', (done) => {
      chai.request(server)
        .put('/api/v1/red-flags/1/comment')
        .send(updateC)
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(404);
          done();
        });
    });
  });
  
  describe('DELETE/red-flags', () => {
    it('should delete a record', (done) => {
      chai.request(server)
        .delete('/api/v1/red-flags/:id')
        .end((err, res) => {
          if (err) throw err;
          res.should.have.status(404);
          done();
        });
      });
    });
  

});

