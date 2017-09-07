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

To help simplify the creation of certificates there is a _gen-keys.sh_ script. Run it and answer the prompts to generate all of the required keys to secure CoPilot.

```sh
$ ./gen-keys.sh
```


### Generate `_env` file from _setup.sh_

Execute the _setup.sh_ script with the path to your key files.

```sh
$ ./setup.sh ~/path/to/TRITON_PRIVATE_KEY keys-test.com/ca.crt keys-test.com/server.key keys-test.com/server.crt
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
