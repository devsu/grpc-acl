# grpc-acl

GRPC ACL microservice in node. Built on top of [condor-framework](https://github.com/devsu/condor-framework) and [acl](https://github.com/OptimalBits/node_acl).

[![Build Status](https://travis-ci.org/devsu/grpc-acl.svg?branch=master)](https://travis-ci.org/devsu/grpc-acl)
[![Coverage Status](https://coveralls.io/repos/github/devsu/grpc-acl/badge.svg?branch=master)](https://coveralls.io/github/devsu/grpc-acl?branch=master)

## Installation

```bash
npm i --save grpc-acl
npm i --save condor-framework
npm i --save acl
```

## Usage

- Copy the [acl.proto](https://github.com/devsu/grpc-acl/blob/master/acl.proto) file.
- Create your server with the following code:

```js
const acl = require('acl');
const AclServer = require('grpc-acl').AclServer;

// Using memory backend. redis, mongo and others available (See acl module documentation)
const backend = new acl.memoryBackend();

const options = {
  'host': 'localhost',
  'port': 3000,
};

const server = new AclServer(backend, options);
// you can add here your own middleware. (See condor-framework documentation)
server.start();
```

To call the service:

```js
const caller = require('grpc-caller');
const client = caller('localhost:3000', './acl.proto', 'com.devsu.acl.AclService');
client.addUserRoles({'user': 'joed', 'roles': ['guest']}).then(() => {
  console.log('done!');
});
```

To find which methods are implemented take a look at the `acl.proto` file. They are pretty similar to the ones found in the documentation of the [acl](https://github.com/OptimalBits/node_acl) module.

You can take the [integration test](https://github.com/devsu/grpc-acl/blob/master/index.integration.spec.js) as an example too.

## Arguments

- `backend`. Check [ACL](https://github.com/OptimalBits/node_acl) documentation.
- `options`.

### Options

You can pass any [condor options](http://condorjs.com/options), and also the following:

| Option                     | Description                                                                    | Default                     |
|----------------------------|--------------------------------------------------------------------------------|-----------------------------|
| aclProtoFilePath           | Path to the `acl.proto` file                                                   | `./acl.proto`               |
| aclServiceFullName         | Service full name of the AclService (must match to the one in the proto file)  | `com.devsu.acl.AclService`  |

## License and Credits

MIT License. Copyright 2017 

Built by the [GRPC experts](https://devsu.com) at Devsu.
