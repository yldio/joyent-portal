const React = require('react');
const ReactRedux = require('react-redux');
const PeopleSection = require('@components/people-list');
const selectors = require('@state/selectors');
const Section = require('./section');
const actions = require('@state/actions');

const {
  connect
} = ReactRedux;

const {
  peopleByOrgIdSelector,
  orgUISelector
} = selectors;

const {
  handleInviteToggle
} = actions;

const People = (props) => {

  return (
    <Section {...props}>
      <PeopleSection {...props} />
    </Section>
  );
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  people: peopleByOrgIdSelector(params.org)(state),
  orgUI: orgUISelector(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleToggle: () => dispatch(handleInviteToggle())
});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
