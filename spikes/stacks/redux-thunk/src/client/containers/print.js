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
  fetchChanges,
  lockPrinter,
  print,
  transitionTo
} = actions;

const {
  BrowserRouter,
  Miss,
  Match,
  Router
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
  onPrint,
  loaded,
  loading,
  locked,
  router
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

    if (!change) {
      return (
        <p>Change not found</p>
      );
    }

    const _onPrint = (id) => {
      return () => {
        return onPrint(id);
      };
    };

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
        <button onClick={_onPrint(params.id)}>Print</button>
      </div>
    );
  };

  return (
    <div>
      <div>
        <p>Printers</p>
        <Printers
          printers={printers}
          onClick={lockPrinter}
          locked={locked}
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
    printers: state.data.printers,
    locked: state.ui.printers.locked
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    lockPrinter: (id) => {
      return dispatch(lockPrinter(id));
    },
    fetchChanges: () => {
      return dispatch(fetchChanges());
    },
    onPrint: (id) => {
      return dispatch(print(id)).then(() => {
        return dispatch(transitionTo('/print'));
      });
    }
  };
};

module.exports = connect(mapStateToProps, mapDispatchToProps, )(Print);
