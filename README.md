# chai-connect-middleware

[![Version](https://img.shields.io/npm/v/chai-connect-middleware.svg?label=version)](https://www.npmjs.com/package/chai-connect-middleware)
[![Build](https://img.shields.io/travis/jaredhanson/chai-connect-middleware.svg)](https://travis-ci.org/jaredhanson/chai-connect-middleware)
[![Quality](https://img.shields.io/codeclimate/github/jaredhanson/chai-connect-middleware.svg?label=quality)](https://codeclimate.com/github/jaredhanson/chai-connect-middleware)
[![Coverage](https://img.shields.io/coveralls/jaredhanson/chai-connect-middleware.svg)](https://coveralls.io/r/jaredhanson/chai-connect-middleware)
[![Dependencies](https://img.shields.io/david/jaredhanson/chai-connect-middleware.svg)](https://david-dm.org/jaredhanson/chai-connect-middleware)


Helpers for testing [Connect](http://www.senchalabs.org/connect/) middleware
with the [Chai](http://chaijs.com/) assertion library.

## Install

    $ npm install chai-connect-middleware

## Usage

#### Use Plugin

Use this plugin as you would all other Chai plugins:

```javascript
var chai = require('chai');

chai.use(require('chai-connect-middleware'));
```

#### Implement Test Cases

Once used, the `chai.connect.use` helper function will be available to set up
test cases for Connect middleware.

The helper function can be called from a hook to setup the test case.  The
helper returns a wrapper on which callbacks are registered to be executed
when the middleware invokes `next` or `end`s the response.  If the middleware
finishes in an unexpected way, the test helper will automatically throw an
exception.

The following demonstrates a [Mocha](http://mochajs.org/) test
case.

```javascript
describe('middleware test', function() {
  var res;
    
  before(function(done) {
    chai.connect.use(middleware)
      .req(function(req) {
        req.query = { hello: 'Bob' };
      })
      .end(function(r) {
        res = r;
        done();
      })
      .dispatch();
  });

  it('should send correct body', function() {
    expect(res.body).to.equal('Hello, Bob');
  });
});
```

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2013-2017 Jared Hanson <[http://jaredhanson.net/](http://jaredhanson.net/)>


