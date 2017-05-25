const GrpcAcl = require('./index');
const AclServer = require('./lib/acl-server');
const AclService = require('./lib/acl-service');

describe('GrpcAcl', () => {
  it('should expose the AclServer class', () => {
    expect(GrpcAcl.AclServer).toEqual(AclServer);
  });
  it('should expose the AclService class', () => {
    expect(GrpcAcl.AclService).toEqual(AclService);
  });
});
