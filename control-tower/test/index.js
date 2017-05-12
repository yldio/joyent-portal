'use strict';

const Code = require('code');
const Lab = require('lab');
const ControlTower = require('../');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


const internals = {
  options: { data: { test: true, name: 'test' } }
};


describe('start()', () => {
  it.skip('starts to listen for service changes and monitors metrics', (done) => {
    const controlTower = new ControlTower(internals.options);
    done();
  });
});
