# How to run the Joyent Portal

#### Requisites

* [ ] [Install node.js](https://nodejs.org/en/download/current/)
* [ ] [Install Yarn](https://yarnpkg.com/en/docs/install)
* [ ] [Setup node-triton](https://github.com/joyent/node-triton#setup)

## via [webconsole-instances](https://github.com/joyent/webconsole-instances)

[webconsole-instances](https://github.com/joyent/webconsole-instances) is the stable version of the portal. It gets updated with stable releases from [joyent-portal](http://github.com/yldio/joyent-portal).

```
➜ git clone https://github.com/joyent/webconsole-instances
➜ cd webconsole-instances
➜ yarn
➜ ./gen-keys.sh
➜ ./setup.sh # use instructions from previous step
➜ sed -i -e 's/production/development/g' _env
➜ docker-compose -f local-compose.yml up
➜ # visit http://localhost:80
```

## via [joyent-portal](http://github.com/yldio/joyent-portal)

[joyent-portal](http://github.com/yldio/joyent-portal) is the unstable and in-development version of the portal. It may be broken at any point in time.

```
➜ git clone https://github.com/yldio/joyent-portal
➜ cd joyent-portal
➜ yarn
➜ yarn run build:bundle
➜ cd bundle
➜ eval "$(triton env <your profile>)"
➜ yarn run start
```
