module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.connect = function(middleware) {
    return new Test(middleware);
  };
};
