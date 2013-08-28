var Test = require('../lib/test');

describe('test middleware that prepares response', function() {
  
  function middleware(req, res, next) {
    res.end();
  }
  
  describe('sync', function() {
    
    describe('and dispatches', function() {
      var pres, eres;
    
      before(function(done) {
        var test = new Test(middleware);
        test.res(function(res) {
          pres = res;
        }).end(function(r) {
          eres = r;
          done();
        }).dispatch();
      });
    
      it('should get same response from preparation and end', function() {
        expect(pres).to.be.equal(eres);
      });
    });
    
  });
  
});
