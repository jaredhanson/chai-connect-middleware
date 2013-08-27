var Test = require('../lib/test');


describe('test error middleware that calls next with error', function() {
  
  function middleware(err, req, res, next) {
    next(err);
  }
  
  describe('with a next callback', function() {
    var err;
    
    before(function(done) {
      var test = new Test(middleware);
      test.next(function(e) {
        err = e;
        done();
      }).dispatch(new Error('whoops'));
    });
    
    it('should call next callback', function() {
      expect(err).to.be.an.instanceOf(Error);
      expect(err.message).to.equal('whoops');
    });
  });
  
});
