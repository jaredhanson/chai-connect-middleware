/* global describe, it, before, expect */

var Response = require('../lib/response')
  , ext = require('../lib/express/response');

describe('Response', function() {
  
  describe('#redirect', function() {
    var res;
  
    before(function(done) {
      res = new Response(function() {
        process.nextTick(done);
      });
      res.redirect = ext.redirect;
      
      res.redirect('http://www.example.com/foo');
    });
  
    it('should get set status and location', function() {
      expect(res.statusCode).to.equal(302);
      expect(res.getHeader('Location')).to.equal('http://www.example.com/foo');
    });
  });
  
  describe('#redirect with status', function() {
    var res;
  
    before(function(done) {
      res = new Response(function() {
        process.nextTick(done);
      });
      res.redirect = ext.redirect;
      
      res.redirect('http://www.example.com/foo', 303);
    });
  
    it('should get set status and location', function() {
      expect(res.statusCode).to.equal(303);
      expect(res.getHeader('Location')).to.equal('http://www.example.com/foo');
    });
  });
  
});
