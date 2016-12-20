const test = require('ava');

const selectors = require('@state/selectors');

const {
  accountSelector,
  orgByIdSelector
  // orgsSelector,
  // orgSectionsSelector,
  // projectsByOrgIdSelector
} = selectors;

test('accountSelector with empty input', (t) => {
  t.deepEqual(accountSelector(), {});

  t.deepEqual(accountSelector({
    account: undefined
  }), {});

  t.deepEqual(accountSelector({
    account: {}
  }), {});

  t.deepEqual(accountSelector({
    account: {
      data: undefined
    }
  }), {});

  t.deepEqual(accountSelector({
    account: {
      data: {}
    }
  }), {});
});

test('accountSelector with attrs', (t) => {
  t.deepEqual(accountSelector({
    account: {
      data: {
        id: '[id]',
        uuid: '[uuid]'
      }
    }
  }), {
    id: '[id]',
    uuid: '[uuid]'
  });
});

test('orgByIdSelector with empty input', (t) => {
  t.deepEqual(orgByIdSelector()(), undefined);

  t.deepEqual(orgByIdSelector()({
    orgs: undefined
  }), undefined);

  t.deepEqual(orgByIdSelector()({
    orgs: {}
  }), undefined);

  t.deepEqual(orgByIdSelector()({
    orgs: {
      data: undefined
    }
  }), undefined);

  t.deepEqual(orgByIdSelector()({
    orgs: {
      data: {}
    }
  }), undefined);
});

test('orgByIdSelector should find org', (t) => {
  const orgs = [{
    id: '1'
  }, {
    id: '2'
  }, {
    id: '3'
  }];

  t.deepEqual(orgByIdSelector('1')({
    orgs: {
      data: orgs
    }
  }), {
    id: '1'
  });

  t.deepEqual(orgByIdSelector('2')({
    orgs: {
      data: orgs
    }
  }), {
    id: '2'
  });

  t.deepEqual(orgByIdSelector('4')({
    orgs: {
      data: orgs
    }
  }), undefined);
});
