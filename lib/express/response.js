exports.redirect = function(url, status) {
  this.statusCode = status || 302;
  this.setHeader('Location', url);
  this.end();
};
