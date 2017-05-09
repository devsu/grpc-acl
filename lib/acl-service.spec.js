const proxyquire = require('proxyquire');
const Spy = require('jasmine-spy');

describe('AclService', () => {
  let AclService, aclService, AclStub, aclInstance, constructorCount, options,
    call, user, role, roles, users, parents, resource, resources, permission,
    permissions;

  beforeEach(() => {
    initData();
    initAclService();
  });

  function initData() {
    call = {'request': {}};
    user = 'peter-1234';
    role = 'admin';
    resource = 'project-1';
    permission = 'view';
    roles = ['admin', 'whatever'];
    parents = ['parent1', 'parent2'];
    users = ['123456', 'peter-1234'];
    resources = ['project1', 'project2'];
    permissions = ['view', 'create'];
  }

  function initAclService() {
    constructorCount = 0;
    options = {'foo': 'bar'};
    aclInstance = {};
    AclStub = class {
      constructor(opt) {
        constructorCount++;
        expect(opt).toEqual(options);
        return aclInstance;
      }
    };
    AclService = proxyquire('./acl-service', {'acl': AclStub});
    aclService = new AclService(options);
  }

  describe('constructor', () => {
    it('should instantiate a new acl instance, with the given options', () => {
      expect(constructorCount).toEqual(1);
    });
  });

  describe('addUserRoles()', () => {
    beforeEach(() => {
      aclInstance.addUserRoles = Spy.resolve();
      call.request = {user, roles};
    });
    it('should call acl.addUserRoles', (done) => {
      aclService.addUserRoles(call).then(() => {
        expect(aclInstance.addUserRoles).toHaveBeenCalledTimes(1);
        expect(aclInstance.addUserRoles).toHaveBeenCalledWith(user, roles);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.addUserRoles = Spy.reject('error');
      aclService.addUserRoles(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('removeUserRoles()', () => {
    beforeEach(() => {
      aclInstance.removeUserRoles = Spy.resolve();
      call.request = {user, roles};
    });
    it('should call acl.removeUserRoles', (done) => {
      aclService.removeUserRoles(call).then(() => {
        expect(aclInstance.removeUserRoles).toHaveBeenCalledTimes(1);
        expect(aclInstance.removeUserRoles).toHaveBeenCalledWith(user, roles);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.removeUserRoles = Spy.reject('error');
      aclService.removeUserRoles(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('getUserRoles()', () => {
    beforeEach(() => {
      aclInstance.userRoles = Spy.resolve();
      call.request = {user};
    });
    it('should call acl.userRoles', (done) => {
      aclService.getUserRoles(call).then(() => {
        expect(aclInstance.userRoles).toHaveBeenCalledTimes(1);
        expect(aclInstance.userRoles).toHaveBeenCalledWith(user);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      aclInstance.userRoles = Spy.resolve(roles);
      aclService.getUserRoles(call).then((result) => {
        expect(result).toEqual({roles});
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.userRoles = Spy.reject('error');
      aclService.getUserRoles(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('getRoleUsers()', () => {
    beforeEach(() => {
      aclInstance.roleUsers = Spy.resolve();
      call.request = {role};
    });
    it('should call acl.roleUsers', (done) => {
      aclService.getRoleUsers(call).then(() => {
        expect(aclInstance.roleUsers).toHaveBeenCalledTimes(1);
        expect(aclInstance.roleUsers).toHaveBeenCalledWith(role);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      aclInstance.roleUsers = Spy.resolve(users);
      aclService.getRoleUsers(call).then((result) => {
        expect(result).toEqual({users});
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.roleUsers = Spy.reject('error');
      aclService.getRoleUsers(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('hasRole()', () => {
    beforeEach(() => {
      aclInstance.hasRole = Spy.resolve();
      call.request = {user, role};
    });
    it('should call acl.hasRole', (done) => {
      aclService.hasRole(call).then(() => {
        expect(aclInstance.hasRole).toHaveBeenCalledTimes(1);
        expect(aclInstance.hasRole).toHaveBeenCalledWith(user, role);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      aclInstance.hasRole = Spy.resolve(true);
      aclService.hasRole(call).then((result) => {
        expect(result).toEqual({'result': true});
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.hasRole = Spy.reject('error');
      aclService.hasRole(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('addRoleParents()', () => {
    beforeEach(() => {
      aclInstance.addRoleParents = Spy.resolve();
      call.request = {role, parents};
    });
    it('should call acl.addRoleParents', (done) => {
      aclService.addRoleParents(call).then(() => {
        expect(aclInstance.addRoleParents).toHaveBeenCalledTimes(1);
        expect(aclInstance.addRoleParents).toHaveBeenCalledWith(role, parents);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.addRoleParents = Spy.reject('error');
      aclService.addRoleParents(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('removeRoleParents()', () => {
    beforeEach(() => {
      aclInstance.removeRoleParents = Spy.resolve();
      call.request = {role, parents};
    });
    it('should call acl.removeRoleParents', (done) => {
      aclService.removeRoleParents(call).then(() => {
        expect(aclInstance.removeRoleParents).toHaveBeenCalledTimes(1);
        expect(aclInstance.removeRoleParents).toHaveBeenCalledWith(role, parents);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.removeRoleParents = Spy.reject('error');
      aclService.removeRoleParents(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('removeRole()', () => {
    beforeEach(() => {
      aclInstance.removeRole = Spy.resolve();
      call.request = {role};
    });
    it('should call acl.removeRole', (done) => {
      aclService.removeRole(call).then(() => {
        expect(aclInstance.removeRole).toHaveBeenCalledTimes(1);
        expect(aclInstance.removeRole).toHaveBeenCalledWith(role);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.removeRole = Spy.reject('error');
      aclService.removeRole(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('removeResource()', () => {
    beforeEach(() => {
      aclInstance.removeResource = Spy.resolve();
      call.request = {resource};
    });
    it('should call acl.removeResource', (done) => {
      aclService.removeResource(call).then(() => {
        expect(aclInstance.removeResource).toHaveBeenCalledTimes(1);
        expect(aclInstance.removeResource).toHaveBeenCalledWith(resource);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.removeResource = Spy.reject('error');
      aclService.removeResource(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('allow()', () => {
    beforeEach(() => {
      aclInstance.allow = Spy.resolve();
      call.request = {roles, resources, permissions};
    });
    it('should call acl.allow', (done) => {
      aclService.allow(call).then(() => {
        expect(aclInstance.allow).toHaveBeenCalledTimes(1);
        expect(aclInstance.allow).toHaveBeenCalledWith(roles, resources, permissions);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.allow = Spy.reject('error');
      aclService.allow(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('allowMultiple()', () => {
    beforeEach(() => {
      aclInstance.allow = Spy.resolve();
      call.request = {'data': [
        {roles, resources, permissions},
        {'roles': [role], 'resources': [resource], 'permissions': [permission]},
      ]};
    });
    it('should call acl.allow', (done) => {
      aclService.allowMultiple(call).then(() => {
        expect(aclInstance.allow).toHaveBeenCalledTimes(1);
        expect(aclInstance.allow).toHaveBeenCalledWith([
          {
            'roles': roles,
            'allows': [{resources, permissions}],
          }, {
            'roles': [role],
            'allows': [{'resources': [resource], 'permissions': [permission]}],
          },
        ]);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.allow = Spy.reject('error');
      aclService.allowMultiple(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('removeAllow()', () => {
    beforeEach(() => {
      aclInstance.removeAllow = Spy.resolve();
      call.request = {role, resources, permissions};
    });
    it('should call acl.removeAllow', (done) => {
      aclService.removeAllow(call).then(() => {
        expect(aclInstance.removeAllow).toHaveBeenCalledTimes(1);
        expect(aclInstance.removeAllow).toHaveBeenCalledWith(role, resources, permissions);
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.removeAllow = Spy.reject('error');
      aclService.removeAllow(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('getPermissions()', () => {
    beforeEach(() => {
      aclInstance.allowedPermissions = Spy.resolve([]);
      call.request = {user, resources};
    });
    it('should call acl.allowedPermissions', (done) => {
      aclService.getPermissions(call).then(() => {
        expect(aclInstance.allowedPermissions).toHaveBeenCalledTimes(1);
        expect(aclInstance.allowedPermissions).toHaveBeenCalledWith(user, resources);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      const response = [
        {'foo': ['bar', 'xyz']},
        {'other': ['another']},
      ];
      aclInstance.allowedPermissions = Spy.resolve(response);
      aclService.getPermissions(call).then((result) => {
        expect(result).toEqual({
          'data': [
            {'resource': 'foo', 'permissions': ['bar', 'xyz']},
            {'resource': 'other', 'permissions': ['another']},
          ],
        });
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.allowedPermissions = Spy.reject('error');
      aclService.getPermissions(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('isAllowed()', () => {
    beforeEach(() => {
      aclInstance.isAllowed = Spy.resolve();
      call.request = {user, resource, permissions};
    });
    it('should call acl.isAllowed', (done) => {
      aclService.isAllowed(call).then(() => {
        expect(aclInstance.isAllowed).toHaveBeenCalledTimes(1);
        expect(aclInstance.isAllowed).toHaveBeenCalledWith(user, resource, permissions);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      aclInstance.isAllowed = Spy.resolve(true);
      aclService.isAllowed(call).then((result) => {
        expect(result).toEqual({'result': true});
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.isAllowed = Spy.reject('error');
      aclService.isAllowed(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('areAnyRolesAllowed()', () => {
    beforeEach(() => {
      aclInstance.areAnyRolesAllowed = Spy.resolve();
      call.request = {roles, resource, permissions};
    });
    it('should call acl.areAnyRolesAllowed', (done) => {
      aclService.areAnyRolesAllowed(call).then(() => {
        expect(aclInstance.areAnyRolesAllowed).toHaveBeenCalledTimes(1);
        expect(aclInstance.areAnyRolesAllowed).toHaveBeenCalledWith(roles, resource, permissions);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      aclInstance.areAnyRolesAllowed = Spy.resolve(true);
      aclService.areAnyRolesAllowed(call).then((result) => {
        expect(result).toEqual({'result': true});
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.areAnyRolesAllowed = Spy.reject('error');
      aclService.areAnyRolesAllowed(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('getRolePermissions()', () => {
    beforeEach(() => {
      aclInstance.whatResources = Spy.resolve({});
      call.request = {role};
    });
    it('should call acl.whatResources', (done) => {
      aclService.getRolePermissions(call).then(() => {
        expect(aclInstance.whatResources).toHaveBeenCalledTimes(1);
        expect(aclInstance.whatResources).toHaveBeenCalledWith(role);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      const response = {
        'resource1': ['permission1'],
        'resource2': ['permission2', 'permission3'],
      };
      aclInstance.whatResources = Spy.resolve(response);
      aclService.getRolePermissions(call).then((result) => {
        expect(result).toEqual({
          'data': [{
            'resource': 'resource1',
            'permissions': ['permission1'],
          }, {
            'resource': 'resource2',
            'permissions': ['permission2', 'permission3'],
          }],
        });
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.whatResources = Spy.reject('error');
      aclService.getRolePermissions(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('getRolesPermissions()', () => {
    beforeEach(() => {
      aclInstance.whatResources = Spy.resolve({});
      call.request = {roles};
    });
    it('should call acl.whatResources', (done) => {
      aclService.getRolesPermissions(call).then(() => {
        expect(aclInstance.whatResources).toHaveBeenCalledTimes(1);
        expect(aclInstance.whatResources).toHaveBeenCalledWith(roles);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      const response = {
        'resource1': ['permission1'],
        'resource2': ['permission2', 'permission3'],
      };
      aclInstance.whatResources = Spy.resolve(response);
      aclService.getRolesPermissions(call).then((result) => {
        expect(result).toEqual({
          'data': [{
            'resource': 'resource1',
            'permissions': ['permission1'],
          }, {
            'resource': 'resource2',
            'permissions': ['permission2', 'permission3'],
          }],
        });
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.whatResources = Spy.reject('error');
      aclService.getRolesPermissions(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });

  describe('getResources()', () => {
    beforeEach(() => {
      aclInstance.whatResources = Spy.resolve([]);
      call.request = {role, permissions};
    });
    it('should call acl.whatResources', (done) => {
      aclService.getResources(call).then(() => {
        expect(aclInstance.whatResources).toHaveBeenCalledTimes(1);
        expect(aclInstance.whatResources).toHaveBeenCalledWith(role, permissions);
        done();
      }).catch(done.fail);
    });
    it('should resolve with the result', (done) => {
      aclInstance.whatResources = Spy.resolve(resources);
      aclService.getResources(call).then((result) => {
        expect(result).toEqual({resources});
        done();
      }).catch(done.fail);
    });
    it('should reject on error', (done) => {
      aclInstance.whatResources = Spy.reject('error');
      aclService.getResources(call).then(done.fail).catch((e) => {
        expect(e).toEqual('error');
        done();
      });
    });
  });
});
