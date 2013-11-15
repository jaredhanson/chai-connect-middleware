/* global describe, it, expect */

var plugin = require('..')
  , Test = require('../lib/test');

describe('plugin', function() {
  
  var chai = {};
  plugin(chai);
  
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
