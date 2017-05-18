'use strict';

const Data = require('./lib/data');
const Examples = require('./lib/models/examples');

const data = new Data();

data.connect(() => {
  data.createDeployment(Examples.deployment).then((deployment) => {
    data.createManifest(deployment.id, Examples.manifest).then((manifest) => {
      console.log('deployment with manifest created');
      process.exit(0);
    });
  }).catch((err) => {
    console.error(err);
  });
});
