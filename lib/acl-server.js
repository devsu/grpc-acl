const Condor = require('condor-framework');
const AclService = require('./acl-service');

const defaultOptions = {
  'aclProtoFilePath': './acl.proto',
  'aclServiceName': 'AclService',
};

module.exports = class extends Condor {
  constructor(backend, customOptions) {
    super(customOptions);
    const options = Object.assign({}, defaultOptions, customOptions);
    if (options.aclServiceFullName) {
      // eslint-disable-next-line no-console
      console.warn('options.aclFullServiceName is deprecated. Use options.aclServiceName instead.');
      options.aclServiceName = options.aclServiceFullName.split('.').pop();
    }
    this.add(options.aclProtoFilePath, options.aclServiceName, new AclService(backend));
  }
};
