![CoPilot Logo](./copilot.png)


[![CircleCI](https://img.shields.io/circleci/project/github/yldio/joyent-portal/master.svg)](https://circleci.com/gh/yldio/joyent-portal)
[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

## Table of Contents

- [Requirements](#requirements)
- [Install](#install)
- [Usage](#usage)
- [Contribute](#contribute)
- [License](#license)

## Requirements

- [Triton account](https://sso.joyent.com/signup)
- [Triton CLI](https://www.npmjs.com/package/triton)
- [Docker](https://www.docker.com/)

## Install

### Set local environment variables

There is a [`setup.sh`](./setup.sh) script that is used to create an environment (`_env`) file that will contain the keys you use to connect to Triton as well as the keys used to secure the CoPilot installation. In order for this to work correctly you will need to first load the Triton environment variables with the `triton profile` you plan to use. Below is an example of setting these environment variables using the `triton` CLI.

```sh
$ eval "$(triton env)"
```

Additionally, you will need a Certificate Authority certificate file, a server certificate, and a server key file. In the subsection below is an example of generating these files.

### Generating Certificates to Secure CoPilot

Credit is due to this [CodeShip blog post](https://blog.codeship.com/how-to-set-up-mutual-tls-authentication/) for the original instructions.

Create the appropriate folders to contain the _ca_, _server_, and _client_ certificate files.

```sh
$ mkdir -p ca server client
```

Generate the CA key and certificate files
```sh
$ openssl genrsa -aes256 -out ca/ca.key 4096 chmod 400 ca/ca.key
$ openssl req -new -x509 -sha256 -days 730 -key ca/ca.key -out ca/ca.crt
$ chmod 444 ca/ca.crt
```

Generate the server key files. The FQDN for your host should be specified. In the example below the host that the server will reside on is 'workshop.host' (please change to whatever host CoPilot will be accessible from).
```sh
$ openssl genrsa -out server/workshop.host.key 2048
$ chmod 400 server/workshop.host.key
$ openssl req -new -key server/workshop.host.key -sha256 -out server/workshop.host.csr
$ openssl x509 -req -days 365 -sha256 -in server/workshop.host.csr -CA ca/ca.crt -CAkey ca/ca.key -set_serial 1 -out server/workshop.host.crt
$ chmod 444 server/workshop.host.crt
```

Generate the client certificates that will be installed into the browser.
```sh
$ openssl genrsa -out client/browser.key 2048
$ openssl req -new -key client/browser.key -out client/browser.csr
$ openssl x509 -req -days 365 -sha256 -in client/browser.csr -CA ca/ca.crt -CAkey ca/ca.key -set_serial 2 -out client/browser.crt
$ openssl pkcs12 -export -clcerts -in client/browser.crt -inkey client/browser.key -out client/browser.p12
```

Next you should install the _client/browser.p12_ certificate in your browser.


### Generate `_env` file from _setup.sh_

Execute the _setup.sh_ script with the path to your key files.

```sh
$ ./setup.sh ~/.ssh/id_rsa ca/ca.crt server/workshop.host.key server/workshop.host.crt
```

## Usage

You have 3 options for where to run CoPilot. You can either run it using the published docker images locally, or on Triton. The last option is to build the docker images and run docker containers from these locally built images.

### Start CoPilot using published docker images locally

```sh
$ docker-compose up -d
```

Navigate to [https://localhost]() to load the dashboard.


### Deploy and run CoPilot on Triton

```sh
$ docker-compose -f triton-compose.yml up -d
```

Optionally use [_triton-docker_](https://github.com/joyent/triton-docker-cli)
```sh
$ triton-compose -f triton-compose.yml up -d
```

### Build and run CoPilot locally

```sh
$ docker-compose -f local-compose.yml up -d
```

## Contribute

See [the contribute file](CONTRIBUTING.md)!

## License

[MPL-2.0](LICENSE)
