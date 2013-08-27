/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Connect middleware, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @constructor
 * @api protected
 */
function Response(cb) {
  this.statusCode = 200;
  this._headers = {};
  this._data = '';
  this._cb = cb;
}

Response.prototype.getHeader = function(name) {
  return this._headers[name];
}

Response.prototype.setHeader = function(name, value) {
  this._headers[name] = value;
}

Response.prototype.redirect = function(url, status) {
  this.statusCode = status || 302;
  this.setHeader('Location', url);
  this.end();
}

Response.prototype.end = function(data, encoding) {
  this._data += data;
  this.body = this._data;
  if (this._cb) { this._cb(); }
}


/**
 * Expose `Response`.
 */
module.exports = Response;
