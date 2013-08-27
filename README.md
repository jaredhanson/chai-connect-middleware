# chai-connect-middleware

[![Build](https://travis-ci.org/jaredhanson/chai-connect-middleware.png)](http://travis-ci.org/jaredhanson/chai-connect-middleware)
[![Coverage](https://coveralls.io/repos/jaredhanson/chai-connect-middleware/badge.png)](https://coveralls.io/r/jaredhanson/chai-connect-middleware)
[![Dependencies](https://david-dm.org/jaredhanson/chai-connect-middleware.png)](http://david-dm.org/jaredhanson/chai-connect-middleware)


Helpers for testing [Connect](http://www.senchalabs.org/connect/) middleware
with the [Chai](http://chaijs.com/) assertion library.

## Install

    $ npm install chai-connect-middleware

## Usage

#### Use Plugin

Use this plugin as you would all other Chai plugins:

```javascript
var chai = require('chai')
  , connect = require('chai-connect-middleware');

chai.use(connect);
```

#### Write Test Cases

Once used, the `chai.connect` helper function will be available to set up
test cases for Connect middleware.

The helper function can be called from a hook to setup the test case.  The
helper returns a wrapper on which callbacks are registered to be executed
when the middleware invokes `next` or `end`s the response.  If the middleware
finishes in an unexpected way, the test helper will automatically throw an
exception.

The following demonstrates a [Mocha](http://visionmedia.github.io/mocha/) test
case.

```javascript
describe('middleware test', function() {
  var res = res;
    
  before(function(done) {
    chai.connect(middleware)
      .req(function(req) {
        req.query = { hello: 'Bob' };
      })
      .end(function(r) {
        res = r;
        done();
      })
      .dispatch(new Error('something went wrong'));
  });

  it('should send correct body', function() {
    expect(res.body).to.equal('Hello, Bob');
  });
});
```

## Tests

    $ npm install
    $ npm test

## Credits

  - [Jared Hanson](http://github.com/jaredhanson)

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>