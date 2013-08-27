var connectMiddleware = require('..')
  , Test = require('../lib/test');

describe('helper', function() {
  
  var chai = {};
  connectMiddleware(chai);
  
  it('should add connect helper to chai', function() {
    expect(chai.connect).to.be.a('function');
  });
  
  describe('when invoked', function() {
    var test = chai.connect({});
    
    it('should return test wrapper', function() {
      expect(test).to.be.an.instanceOf(Test);
    });
  });
  
});
