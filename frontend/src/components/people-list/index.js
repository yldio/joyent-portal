const React = require('react');

const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const Button = require('@ui/components/button');

const PeopleTable = require('./table');
const Invite = require('./invite');

const buttonStyle = {
  float: 'right'
};

const People = (props) => {

  const {
    people = [],
    orgUI = {},
    handleToggle,
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

      {orgUI.invite_toggled ? <Invite {...props} /> : null}

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
  orgUI: React.PropTypes.object,
  people: React.PropTypes.array
};

module.exports = People;