const React = require('react');

const PropTypes = require('@root/prop-types');
const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const Button = require('@ui/components/button');

const PeopleTable = require('./table');

const buttonStyle = {
  float: 'right'
};

const People = (props) => {

  const {
    people = [],
    orgUI = {},
    handleToggle
  } = props;

  return (
    <div>
      <Row>
        <Column smOffset={9} xs={2}>
          <Button
            disabled={orgUI.invite_toggled}
            onClick={handleToggle}
            style={buttonStyle}
          >
            Invite
          </Button>
        </Column>
      </Row>

      <Row>
        <Column xs={12}>
          <PeopleTable
            people={people}
          />
        </Column>
      </Row>
    </div>
  );
};

People.propTypes = {
  handleToggle: React.PropTypes.func,
  orgUI: React.PropTypes.obj,
  people: React.PropTypes.arrayOf(PropTypes.person),
};

module.exports = People;