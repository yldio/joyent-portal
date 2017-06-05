'use strict';

const Data = require('portal-data');

const data = new Data();

const ifError = function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};

data.connect(() => {
  data.createDatacenter({ region: 'us-sw', name: 'us-sw' }, (err, datacenter) => {
    ifError(err);

    data.createUser({ firstName: 'Nikola', lastName: 'Tesla', email: 'nikola@tesla.com', login: 'nikola' }, (err, user) => {
      ifError(err);

      data.createPortal({
        user,
        datacenter
      }, (err, portal) => {
        ifError(err);

        data.createDeploymentGroup({ name: 'test' }, (err) => {
          ifError(err);

          console.log('data bootstrapped');
          process.exit(0);
        });
      });
    });
  });
});
