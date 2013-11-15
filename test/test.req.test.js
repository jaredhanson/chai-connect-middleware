/* global describe, it, before, expect */

var Test = require('../lib/test');

describe('test middleware that prepares request', function() {
  
  function middleware(req, res, next) {
    res.end(req.query.hello);
  }
  
  describe('sync', function() {
    
    describe('and dispatches', function() {
      var res;
    
      before(function(done) {
        var test = new Test(middleware);
        test.req(function(req) {
          req.query = {};
          req.query.hello = 'World';
        }).end(function(r) {
          res = r;
          done();
        }).dispatch();
      });
      
      it('should not have Express extensions', function() {
        expect(res.redirect).to.be.undefined;
      });
    
      it('should call end callback', function() {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('World');
      });
    });
    
    describe('and dispatches with Express extensions', function() {
      var res;
    
      before(function(done) {
        var test = new Test('express', middleware);
        test.req(function(req) {
          req.query = {};
          req.query.hello = 'World';
        }).end(function(r) {
          res = r;
          done();
        }).dispatch();
      });
      
      it('should have Express extensions', function() {
        expect(res.redirect).to.be.a('function');
      });
    
      it('should call end callback', function() {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('World');
      });
    });
    
  });
  
  describe('async', function() {
    
    describe('and dispatches', function() {
      var res;
    
      before(function(done) {
        var test = new Test(middleware);
        test.req(function(req, done) {
          req.query = {};
          req.query.hello = 'Async World';
          process.nextTick(done);
        }).end(function(r) {
          res = r;
          done();
        }).dispatch();
      });
    
      it('should call end callback', function() {
        expect(res.statusCode).to.be.equal(200);
        expect(res.body).to.be.equal('Async World');
      });
    });
    
  });
  
});
