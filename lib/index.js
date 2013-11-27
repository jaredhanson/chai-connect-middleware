module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.connect = chai.connect || {};
  chai.connect.use = function(middleware) {
    return new Test(middleware);
  };
};
