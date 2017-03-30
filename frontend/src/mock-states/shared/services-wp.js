/*eslint-disable */
export const wpServices = [{
  "uuid": "081a792c-47e0-4439-924b-2efa9788ae9e",
  "id": "nginx",
  "name": "Nginx",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 1,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }],
  "connections": [
    "be227788-74f1-4e5b-a85f-b5c71cbae8d8"
  ]
}, {
  "uuid": "be227788-74f1-4e5b-a85f-b5c71cbae8d8",
  "id": "wordpress",
  "name": "Wordpress",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 1,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "crazy-cpu"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "crazy-disk"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "crazy-memory"
  }],
  "connections": [
    "6a0eee76-c019-413b-9d5f-44712b55b993",
    "6d31aff4-de1e-4042-a983-fbd23d5c530c",
    "4ee4103e-1a52-4099-a48e-01588f597c70"
  ]
}, {
  "uuid": "6a0eee76-c019-413b-9d5f-44712b55b993",
  "id": "nfs",
  "name": "NFS",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 1,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }]
}, {
  "uuid": "6d31aff4-de1e-4042-a983-fbd23d5c530c",
  "id": "memcached",
  "name": "Memcached",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 5,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }]
}, {
  "uuid": "4ee4103e-1a52-4099-a48e-01588f597c70",
  "id": "percona",
  "name": "Percona",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 5,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }]
}, {
  "uuid": "9572d367-c4ae-4fb1-8ad5-f5e3830e7034",
  "id": "primary",
  "name": "Primary",
  "parent": "4ee4103e-1a52-4099-a48e-01588f597c70",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 1,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }]
}, {
  "uuid": "c8411ef0-ab39-42cb-a704-d20b170eff31",
  "id": "secondaries",
  "name": "Secondaries",
  "parent": "4ee4103e-1a52-4099-a48e-01588f597c70",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 4,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }]
}, {
  "uuid": "97c68055-db88-45c9-ad49-f26da4264777",
  "id": "consul",
  "name": "Consul",
  "project": "e0ea0c02-55cc-45fe-8064-3e5176a59401",
  "instances": 1,
  "metrics": [{
    "type": "2aaa237d-42b3-442f-9094-a17aa470014b",
    "dataset": "3e6ee79a-7453-4fc6-b9da-7ae1e41138ec"
  }, {
    "type": "dca08514-72e5-46ce-ad91-e68b3b0914d9",
    "dataset": "4e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }, {
    "type": "dca08514-72e5-46ce-ad92-e68b3b0914d4",
    "dataset": "6e6ee79a-7453-4fc6-b9da-7ae1e41138ed"
  }]
}];
