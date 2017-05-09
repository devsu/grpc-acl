const proxyquire = require('proxyquire');
const Spy = require('jasmine-spy');

describe('AclServer', () => {
  let AclServer, aclServer, AclServiceStub, CondorStub, aclService, backend,
    options, countAclService, countCondor;

  beforeEach(() => {
    countAclService = 0;
    aclService = {};
    AclServiceStub = class {
      constructor(opt) {
        countAclService++;
        expect(opt).toEqual(backend);
        return aclService;
      }
    };
    countCondor = 0;
    CondorStub = class {
      constructor(opt) {
        countCondor++;
        expect(opt).toEqual(options);
      }
      addService() {
        return this;
      }
    };
    backend = {'foo': 'bar'};
    options = {'other': 'another'};
    AclServer = proxyquire('./acl-server',
      {'./acl-service': AclServiceStub, 'condor-framework': CondorStub});
  });

  it('should extend Condor server', () => {
    expect(AclServer.prototype instanceof CondorStub).toBeTruthy();
  });

  describe('constructor()', () => {
    it('should setup AclService and Condor', () => {
      aclServer = new AclServer(backend, options);
      expect(countAclService).toEqual(1);
      expect(countCondor).toEqual(1);
    });

    it('should add the ACL service', () => {
      CondorStub.prototype.addService = Spy.create();
      aclServer = new AclServer(backend, options);
      expect(aclServer.addService).toHaveBeenCalledTimes(1);
      expect(aclServer.addService).toHaveBeenCalledWith(
        './acl.proto', 'acl.AclService', aclService);
    });

    it('should return the instance', () => {
      aclServer = new AclServer(backend, options);
      expect(aclServer instanceof AclServer);
    });

    describe('options:aclProtoFilePath', () => {
      it('should use it instead of the default', () => {
        CondorStub.prototype.addService = Spy.create();
        options.aclProtoFilePath = '../protos/acl.proto';
        aclServer = new AclServer(backend, options);
        expect(aclServer.addService).toHaveBeenCalledTimes(1);
        expect(aclServer.addService).toHaveBeenCalledWith(
          '../protos/acl.proto', 'acl.AclService', aclService);
      });
    });

    describe('options:aclServiceFullName', () => {
      it('should use it instead of the default', () => {
        CondorStub.prototype.addService = Spy.create();
        options.aclServiceFullName = 'com.AclService';
        aclServer = new AclServer(backend, options);
        expect(aclServer.addService).toHaveBeenCalledTimes(1);
        expect(aclServer.addService).toHaveBeenCalledWith(
          './acl.proto', 'com.AclService', aclService);
      });
    });
  });
});
