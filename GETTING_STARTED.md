# Getting Started

## Setup the project

**Install Node.js**, preferably 8.0:

```
λ brew install node
```

with [n](https://github.com/tj/n):

```
λ n 8.0.0
```

**Install Yarn**:

```
λ npm install -g yarn
```

**Install ZMQ**:

```
λ brew install zmq
```

**Clone repo**:

```
λ git clone git@github.com:yldio/joyent-portal.git
Cloning into 'joyent-portal'...
remote: Counting objects: 13702, done.
remote: Compressing objects: 100% (146/146), done.
remote: Total 13702 (delta 89), reused 138 (delta 53), pack-reused 13491
Receiving objects: 100% (13702/13702), 15.08 MiB | 5.44 MiB/s, done.
Resolving deltas: 100% (8824/8824), done.
Downloading legacy/design/ui-library.sketch (8.48 MB)
Checking out files: 100% (1795/1795), done.
λ cd joyent-portal
```

**Install dependendencies**:

```
joyent-portal:master λ yarn
yarn install v0.24.6
[1/5] 🔍  Resolving packages...
[2/5] 🚚  Fetching packages...
[3/5] 🔗  Linking dependencies...
[4/5] 📃  Building fresh packages...
[5/5] ♻️  Cleaning modules...
$ redrun -s clean bootstrap
> lerna clean --yes && lerna bootstrap
lerna info version 2.0.0-rc.5
lerna info versioning independent
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/babel-preset/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/cloudapi-gql/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/cp-frontend/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/cp-gql-mock-server/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/cp-gql-schema/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/cp-rdb-bootstrap/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/docker-compose-client/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/eslint-config/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/normalized-styled-components/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/portal-api/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/portal-data/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/pseudo-json-ast/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/pseudo-yaml-ast/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/remcalc/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/rnd-id/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/styled-is/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/ui-toolkit/node_modules
lerna info clean removing /Users/ramitos/dev/yld/joyent-portal/packages/unitcalc/node_modules
lerna success clean finished
lerna info version 2.0.0-rc.5
lerna info versioning independent
lerna info Bootstrapping 18 packages
lerna info lifecycle preinstall
lerna info Installing external dependencies
lerna info Symlinking packages and binaries
lerna info lifecycle postinstall
lerna info lifecycle prepublish
lerna success Bootstrapped 18 packages
✨  Done in 297.44s.
```

## Start dev environment


**Start mock server**:

```
joyent-portal:master λ cd packages/cp-gql-mock-server 
cp-gql-mock-server:master* λ npm run start

> joyent-cp-gql-mock-server@1.0.4 start /Users/ramitos/dev/yld/joyent-portal/packages/cp-gql-mock-server
> node src/index.js

server started at http://0.0.0.0:3000
```

**Start UI Toolkit**:

```
joyent-portal:master* λ cd packages/ui-toolkit 
ui-toolkit:master* λ npm run watch

> joyent-ui-toolkit@1.1.0 watch /Users/ramitos/dev/yld/joyent-portal/packages/ui-toolkit
> cross-env NODE_ENV=development redrun -s -c copy-fonts "compile --watch"

> rm -rf dist; mkdir -p dist/typography; cp -r src/typography/libre-franklin dist/typography || true && babel src --out-dir dist --source-maps inline --watch || true
src/anchor/index.js -> dist/anchor/index.js
...
```

**Start Frontend**:

```
joyent-portal:master* λ cd packages/cp-frontend 
cp-frontend:master* λ npm run start          

> joyent-cp-frontend@1.1.0 start /Users/ramitos/dev/yld/joyent-portal/packages/cp-frontend
> PORT=3069 react-scripts start

Starting the development server...

Compiled successfully!

You can now view joyent-cp-frontend in the browser.

  Local:            http://localhost:3069/
  On Your Network:  http://192.168.1.13:3069/

Note that the development build is not optimized.
To create a production build, use yarn run build.
```