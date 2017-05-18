'use strict';

const Code = require('code');
const Lab = require('lab');


// Test shortcuts

const lab = exports.lab = Lab.script();
const describe = lab.describe;
const it = lab.it;
const expect = Code.expect;


describe('start()', () => {
  it.skip('starts to listen for service changes and monitors metrics', (done) => {
    expect(done).to.exist();
    done();
  });
});
