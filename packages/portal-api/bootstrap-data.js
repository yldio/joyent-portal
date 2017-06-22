'use strict';

const Data = require('portal-data');


const ifError = function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
};

const bootstrap = function () {
  const data = new Data({
    db: {
      host: process.env.RETHINK_HOST || 'localhost'
    }
  });

  const region = process.env.TRITON_DC || 'us-sw-1';
  const login = process.env.TRITON_USER || 'nikola';

  data.connect(() => {
    data.createDatacenter({ region, name: region }, (err, datacenter) => {
      ifError(err);

      data.createUser({ firstName: 'Nikola', lastName: 'Tesla', email: 'nikola@tesla.com', login }, (err, user) => {
        ifError(err);

        data.createPortal({
          user,
          datacenter
        }, (err, portal) => {
          ifError(err);
          console.log('data bootstrapped');
          process.exit(0);
        });
      });
    });
  });
};
/*
const main = function () {
  const dropData = new Data({
    db: {
      host: process.env.RETHINK_HOST || 'localhost'
    }
  });

  dropData.connect(() => {
    dropData._db.r.dbDrop('portal').run(dropData._db._connection, () => {
      bootstrap();
    });
  });
};
*/
bootstrap();
