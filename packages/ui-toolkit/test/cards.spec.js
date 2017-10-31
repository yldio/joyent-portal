const { Chrome } = require('navalia');
const { toMatchImageSnapshot } = require('jest-image-snapshot');

expect.extend({ toMatchImageSnapshot });

describe('Visual Regressions', () => {
  let chrome = null;

  beforeEach(() => {
    chrome = new Chrome();
  });

  afterEach(() => {
    chrome.done();
  });

  it('Card > Headed > Collapsed', () =>
    chrome
      .goto('http://0.0.0.0:6060/#!/Card/1')
      .wait('div[name="card"]')
      .then(() => chrome.screenshot())
      .then(image => expect(image).toMatchImageSnapshot()));

  it('Card > Headed', () =>
    chrome
      .goto('http://0.0.0.0:6060/#!/Card/2')
      .then(() => chrome.screenshot())
      .then(image => expect(image).toMatchImageSnapshot()));

  it('Card > Headed > Collapsed', () =>
    chrome
      .goto('http://0.0.0.0:6060/#!/Card/3')
      .then(() => chrome.screenshot())
      .then(image => expect(image).toMatchImageSnapshot()));

  it('Card > Headed', () =>
    chrome
      .goto('http://0.0.0.0:6060/#!/Card/4')
      .then(() => chrome.screenshot())
      .then(image => expect(image).toMatchImageSnapshot()));
});
