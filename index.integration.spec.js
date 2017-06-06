const acl = require('acl');
const caller = require('grpc-caller');
const AclServer = require('./index').AclServer;

describe('AclServer', () => {
  let server, client;

  beforeAll(() => {
    // eslint-disable-next-line new-cap
    server = new AclServer(new acl.memoryBackend()).start();
    client = caller('localhost:50051', './acl.proto', 'AclService');
  });

  afterAll((done) => {
    server.stop().then(done).catch(done.fail);
  });

  it('should pass the smoke test', (done) => {
    Promise.resolve().then(() => {
      return client.allow({
        'roles': ['guest'],
        'resources': ['blogs'],
        'permissions': ['view'],
      });
    }).then(() => {
      return client.addUserRoles({
        'user': 'joed',
        'roles': ['guest'],
      });
    }).then(() => {
      return client.isAllowed({
        'user': 'joed',
        'resource': 'blogs',
        'permissions': ['view'],
      });
    }).then((data) => {
      expect(data.result).toEqual(true);
    }).then(() => {
      return client.isAllowed({
        'user': 'joed',
        'resource': 'blogs',
        'permissions': ['delete'],
      });
    }).then((data) => {
      expect(data.result).toEqual(false);
    }).then(done).catch(done.fail);
  });
});
