/**
 * Module dependencies.
 */
var Request = require('./request')
  , Response = require('./response');


/**
 * Creates an instance of `Test`.
 *
 * @constructor
 * @api protected
 */
function Test(middleware) {
  this._middleware = middleware;
}

/**
 * Register a callback to be invoked when middleware calls `next()`.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.next = function(cb) {
  this._next = cb;
  return this;
};

/**
 * Register a callback to be invoked when middleware `end()`s response.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.end = function(cb) {
  this._end = cb;
  return this;
};

/**
 * Register a callback to be invoked when request is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.req = function(cb) {
  this._req = cb;
  return this;
};

/**
 * Register a callback to be invoked when response is prepared.
 *
 * @param {Function} cb
 * @return {Test} for chaining
 * @api public
 */
Test.prototype.res = function(cb) {
  this._res = cb;
  return this;
};

/**
 * Dispatch mock request to middleware.
 *
 * @api public
 */
Test.prototype.dispatch = function(err) {
  var self = this
    , req = new Request()
    , before = this._req;
  
  function ready() {
    var res = new Response(function() {
      if (!self._end) { throw new Error('res#end should not be called'); }
      self._end.call(this, res);
    });
    
    if (self._res) { self._res(res); }
    
    function next(err) {
      if (!self._next) { throw new Error('next should not be called'); }
      self._next.call(this, err);
    }
    
    if (err) {
      self._middleware(err, req, res, next);
    } else {
      self._middleware(req, res, next);
    }
  }
  
  if (before && before.length == 2) {
    before(req, ready);
  } else if (before) {
    before(req);
    ready();
  } else {
    ready();
  }
};


/**
 * Expose `Test`.
 */
module.exports = Test;
