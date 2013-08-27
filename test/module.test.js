var connectMiddleware = require('..');

describe('chai-connect-middleware', function() {
  
  it('should export function', function() {
    expect(connectMiddleware).to.be.a('function');
  });
  
});
