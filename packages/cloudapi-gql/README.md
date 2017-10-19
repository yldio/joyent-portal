# cloudapi-gql

[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg)](https://github.com/RichardLitt/standard-readme)

Server that exposes [CloudApi](https://apidocs.joyent.com/cloudapi/) through
[GraphQL](http://graphql.org).

## Table of Contents

* [Install](#install)
* [Usage](#usage)
* [Todo](#todo)
* [License](#license)

## Install

```
yarn add cloudapi-gql
```

## Usage

```
yarn run start
```

* [GraphiQL](http://0.0.0.0:4000/graphiql)
* [Graphidoc](http://0.0.0.0:4000/doc)
* [Voyager](http://0.0.0.0:4000/voyager)
* [Playground](http://0.0.0.0:4000/playground)

![](https://cldup.com/StGgfIbD3N.png) ![](https://cldup.com/fhpul_AJ13.png)
![](https://cldup.com/A-VwSbvWBe.png) ![](https://cldup.com/08P360Skhx.png)

```
yarn run faker
```

* [GraphQL Faker Interactive Editor](http://0.0.0.0:9002/editor)
* [GraphQL Faker API](http://0.0.0.0:9002/graphql)

![](https://cldup.com/VWadVMorQ0.png)

## Todo

* [ ] Finish missing connections, transforms, and mutations
* [ ] remove node-triton dependency
* [ ] support multiple users on the same server

## License

MPL-2.0
