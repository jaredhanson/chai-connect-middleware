module.exports = function(chai, _) {
  var Test = require('./test');
  
  chai.connect = chai.connect || {};
  chai.connect.use = function(extensions, middleware) {
    return new Test(extensions, middleware);
  };
};
