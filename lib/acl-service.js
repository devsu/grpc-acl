const ACL = require('acl');

module.exports = class {
  constructor(options) {
    this.acl = new ACL(options);
  }

  addUserRoles(call) {
    return this.acl.addUserRoles(call.request.user, call.request.roles);
  }

  removeUserRoles(call) {
    return this.acl.removeUserRoles(call.request.user, call.request.roles);
  }

  getUserRoles(call) {
    return this.acl.userRoles(call.request.user).then((roles) => {
      return {roles};
    });
  }

  getRoleUsers(call) {
    return this.acl.roleUsers(call.request.role).then((users) => {
      return {users};
    });
  }

  hasRole(call) {
    return this.acl.hasRole(call.request.user, call.request.role).then((result) => {
      return {result};
    });
  }

  addRoleParents(call) {
    return this.acl.addRoleParents(call.request.role, call.request.parents);
  }

  removeRoleParents(call) {
    return this.acl.removeRoleParents(call.request.role, call.request.parents);
  }

  removeRole(call) {
    return this.acl.removeRole(call.request.role);
  }

  removeResource(call) {
    return this.acl.removeResource(call.request.resource);
  }

  allow(call) {
    return this.acl.allow(call.request.roles, call.request.resources, call.request.permissions);
  }

  allowMultiple(call) {
    const allows = call.request.data.map((allow) => {
      return {
        'roles': allow.roles,
        'allows': [{'resources': allow.resources, 'permissions': allow.permissions}],
      };
    });
    return this.acl.allow(allows);
  }

  removeAllow(call) {
    return this.acl.removeAllow(call.request.role, call.request.resources,
      call.request.permissions);
  }

  getPermissions(call) {
    const req = call.request;
    return this.acl.allowedPermissions(req.user, req.resources).then((permissions) => {
      const data = permissions.map((permission) => {
        const key = Object.keys(permission)[0];
        return {
          'resource': key,
          'permissions': permission[key],
        };
      });
      return {data};
    });
  }

  isAllowed(call) {
    const req = call.request;
    return this.acl.isAllowed(req.user, req.resource, req.permissions).then((result) => {
      return {result};
    });
  }

  areAnyRolesAllowed(call) {
    const req = call.request;
    return this.acl.areAnyRolesAllowed(req.roles, req.resource, req.permissions).then((result) => {
      return {result};
    });
  }

  getRolePermissions(call) {
    return this._getRolePermissionsCommon(call.request.role);
  }

  getRolesPermissions(call) {
    return this._getRolePermissionsCommon(call.request.roles);
  }

  _getRolePermissionsCommon(roles) {
    return this.acl.whatResources(roles).then((resourcesObj) => {
      const data = Object.keys(resourcesObj).map((key) => {
        return {
          'resource': key,
          'permissions': resourcesObj[key],
        };
      });
      return {data};
    });
  }

  getResources(call) {
    return this.acl.whatResources(call.request.role, call.request.permissions).then((resources) => {
      return {resources};
    });
  }
};
