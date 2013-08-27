var Test = require('../lib/test');

describe('test middleware that calls next', function() {
  
  function middleware(req, res, next) {
    next();
  }
  
  describe('with a next callback', function() {
    var err;
    
    before(function(done) {
      var test = new Test(middleware);
      test.next(function(e) {
        err = e;
        done();
      }).dispatch();
    });
    
    it('should call next callback', function() {
      expect(err).to.be.undefined;
    });
  });
  
  describe('without a next callback', function() {
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(middleware);
        test.dispatch();
      }).to.throw(Error, 'next should not be called');
    });
  });
  
});

describe('test middleware that calls next with error', function() {
  
  function middleware(req, res, next) {
    next(new Error('oops'));
  }
  
  describe('with a next callback', function() {
    var err;
    
    before(function(done) {
      var test = new Test(middleware);
      test.next(function(e) {
        err = e;
        done();
      }).dispatch();
    });
    
    it('should call next callback', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('oops');
    });
  });
  
});
