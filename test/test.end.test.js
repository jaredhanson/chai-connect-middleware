var Test = require('../lib/test');

describe('test middleware that calls end', function() {
  
  function middleware(req, res, next) {
    res.end('Hello');
  }
  
  describe('with an end callback', function() {
    var res;
    
    before(function(done) {
      var test = new Test(middleware);
      test.end(function(r) {
        res = r;
        done();
      }).dispatch();
    });
    
    it('should call end callback', function() {
      expect(res.statusCode).to.be.equal(200);
      expect(res.body).to.be.equal('Hello');
    });
  });
  
  describe('without an end callback', function() {
    it('should throw an error', function() {
      expect(function() {
        var test = new Test(middleware);
        test.dispatch();
      }).to.throw(Error, 'res#end should not be called');
    });
  });
  
});
