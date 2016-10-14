const ReactRouter = require('react-router');
const ReactRedux = require('react-redux');
const React = require('react');
const find = require('lodash.find');

const Loader = require('../components/loader');
const Printers = require('../components/printers');
const Changes = require('../components/changes');
const Change = require('../components/change');

const actions = require('../actions');

const {
  fetchChanges
} = actions;

const {
  BrowserRouter,
  Miss,
  Match,
} = ReactRouter;

const {
  connect
} = ReactRedux;

const Print = ({
  pathname,
  printers = [],
  changes = [],
  lockPrinter,
  fetchChanges,
  loaded,
  loading
}) => {
  const allChanges = () => {
    return (
      <div>
        <p>Changes</p>
        <Loader
          loaded={loaded}
          loading={loading}
          fetch={fetchChanges}
        >
          <Changes
            pathname={pathname}
            changes={changes}
          />
        </Loader>
      </div>
    );
  };

  const singleChange = ({
    params
  }) => {
    const change = find(changes, (change) => {
      return change.id === params.id;
    });

    // TODO: don't load all changes
    return (
      <div>
        <p>Change</p>
        <Loader
          loaded={loaded}
          loading={loading}
          fetch={fetchChanges}
        >
          <Change {...change} />
        </Loader>
      </div>
    );
  };

  return (
    <div>
      <div>
        <p>Printers</p>
        <Printers
          printers={printers}
        />
      </div>

      <Match pattern={`${pathname}/:id`} render={singleChange} />
      <Match exactly pattern={pathname} render={allChanges} />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    loaded: state.ui.changes.loaded,
    loading: state.ui.changes.loading,
    changes: state.data.changes,
    printers: state.data.printers
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    lockPrinter: (id) => {},
    fetchChanges: () => {
      dispatch(fetchChanges());
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Print);
