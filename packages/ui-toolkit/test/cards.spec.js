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

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/5')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/6')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/7')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/8')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/9')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/10')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/11')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/12')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/13')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/14')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/15')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/16')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/17')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/18')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/19')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/20')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/21')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/22')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed > Collapsed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/23')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));

  // it('Card > Headed', () =>
  //   chrome
  //     .goto('http://0.0.0.0:6060/#!/Card/24')
  //     .then(() => chrome.screenshot())
  //     .then(image => expect(image).toMatchImageSnapshot()));
});
