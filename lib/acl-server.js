const Condor = require('condor-framework');
const AclService = require('./acl-service');

const defaultOptions = {
  'aclProtoFilePath': './acl.proto',
  'aclServiceFullName': 'acl.AclService',
};

module.exports = class extends Condor {
  constructor(backend, customOptions) {
    super(customOptions);
    const options = Object.assign({}, defaultOptions, customOptions);
    this.addService(options.aclProtoFilePath, options.aclServiceFullName, new AclService(backend));
  }
};
