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
      add() {
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
      CondorStub.prototype.add = Spy.create();
      aclServer = new AclServer(backend, options);
      expect(aclServer.add).toHaveBeenCalledTimes(1);
      expect(aclServer.add).toHaveBeenCalledWith(
        './acl.proto', 'AclService', aclService);
    });

    it('should return the instance', () => {
      aclServer = new AclServer(backend, options);
      expect(aclServer instanceof AclServer);
    });

    describe('options:aclProtoFilePath', () => {
      it('should use it instead of the default', () => {
        CondorStub.prototype.add = Spy.create();
        options.aclProtoFilePath = '../protos/acl.proto';
        aclServer = new AclServer(backend, options);
        expect(aclServer.add).toHaveBeenCalledTimes(1);
        expect(aclServer.add).toHaveBeenCalledWith(
          '../protos/acl.proto', 'AclService', aclService);
      });
    });

    describe('options:aclServiceFullName', () => {
      let originalWarn;

      beforeEach(() => {
        /* eslint-disable no-console */
        originalWarn = console.warn;
        console.warn = Spy.create();
        CondorStub.prototype.add = Spy.create();
        options.aclServiceFullName = 'com.MyAclService';
        aclServer = new AclServer(backend, options);
        /* eslint-enable no-console */
      });

      afterEach(() => {
        // eslint-disable-next-line no-console
        console.warn = originalWarn;
      });

      it('should use it instead of the default', () => {
        expect(aclServer.add).toHaveBeenCalledTimes(1);
        expect(aclServer.add).toHaveBeenCalledWith(
          './acl.proto', 'MyAclService', aclService);
      });

      it('should log a deprecated warning', () => {
        /* eslint-disable no-console */
        expect(console.warn).toHaveBeenCalledTimes(1);
        expect(console.warn).toHaveBeenCalledWith(
          'options.aclFullServiceName is deprecated. Use options.aclServiceName instead.');
        /* eslint-enable no-console */
      });
    });

    describe('options:aclServiceName', () => {
      it('should use it instead of the default', () => {
        CondorStub.prototype.add = Spy.create();
        options.aclServiceName = 'MyAclService';
        aclServer = new AclServer(backend, options);
        expect(aclServer.add).toHaveBeenCalledTimes(1);
        expect(aclServer.add).toHaveBeenCalledWith(
          './acl.proto', 'MyAclService', aclService);
      });
    });
  });
});
