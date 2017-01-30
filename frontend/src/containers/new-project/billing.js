const React = require('react');
const ReactRedux = require('react-redux');
const selectors = require('@state/selectors');
const actions = require('@state/actions');

const PropTypes = require('@root/prop-types');
const BillingForm = require('@components/new-project/billing');

const {
  connect
} = ReactRedux;

const {
  orgByIdSelector
} = selectors;

const {
  handleNewProjectBilling
} = actions;

const Billing = (props) => {

  const {
    cards,
    handleNewProjectBilling,
    org
  } = props;

  return (
    <BillingForm
      cards={cards}
      handleSubmit={handleNewProjectBilling}
      org={org}
    />
  );
};

Billing.propTypes = {
  cards: React.PropTypes.array, // TODO set up example card in thingie data
  handleNewProjectBilling: React.PropTypes.func.isRequired,
  org: PropTypes.org.isRequired
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  // TODO add cards - as above
  org: orgByIdSelector(params.org)(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProjectBilling: () => dispatch(handleNewProjectBilling())
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(Billing);
