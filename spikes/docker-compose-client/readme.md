# docker-compose-client

## usage

```js
const client = new DockerComposeClient();

const res = await client.provision({
  projectName: 'docker-compose-client',
  manifest: `
    hello:
      image: hello-world:latest
    world:
      image: consul:latest
    node:
      image: node:latest
  `
});
```

## todo

 - proper flow support

## license

Apache-2.0