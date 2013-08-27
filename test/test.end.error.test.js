var Test = require('../lib/test');

describe('test error middleware that calls end', function() {
  
  function middleware(err, req, res, next) {
    res.statusCode = 500;
    res.end(err.message);
  }
  
  describe('with an end callback', function() {
    var res;
    
    before(function(done) {
      var test = new Test(middleware);
      test.end(function(r) {
        res = r;
        done();
      }).dispatch(new Error('something went wrong'));
    });
    
    it('should call end callback', function() {
      expect(res.statusCode).to.be.equal(500);
      expect(res.body).to.be.equal('something went wrong');
    });
  });
  
});
