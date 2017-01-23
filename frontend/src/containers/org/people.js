const React = require('react');
// const ReactIntl = require('react-intl');
const ReactRedux = require('react-redux');
// const ReactRouter = require('react-router');

const Row = require('@ui/components/row');
const Column= require('@ui/components/column');
const Button= require('@ui/components/button');
const PropTypes = require('@root/prop-types');
const PeopleList = require('@components/people-list');
const selectors = require('@state/selectors');

const Section = require('./section');

// const {
//   FormattedMessage
// } = ReactIntl;

const {
  connect
} = ReactRedux;

const {
  peopleByOrgIdSelector
} = selectors;

const buttonStyle = {
  float: 'right'
};

const People = (props) => {

  const {
    people = []
  } = props;

  return (
    <Section {...props}>
      <Row>
        <Column smOffset={9} xs={2}>
          <Button style={buttonStyle}>Invite</Button>
        </Column>
      </Row>

      <Row>
        <Column xs={12}>
          <PeopleList
            people={people}
          />
        </Column>
      </Row>
    </Section>
  );
};

People.propTypes = {
  people: React.PropTypes.arrayOf(PropTypes.person)
};

const mapStateToProps = (state, {
  params = {}
}) => ({
  people: peopleByOrgIdSelector(params.org)(state)
});

const mapDispatchToProps = (dispatch) => ({});

module.exports = connect(
  mapStateToProps,
  mapDispatchToProps
)(People);
