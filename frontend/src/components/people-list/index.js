const React = require('react');

const Empty = require('@components/empty/people');

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
    UI = {},
    handleToggle,
    people
  } = props;

  return (
    <div>
      <Row>
        <Column md={2} mdOffset={9}>
          <Button
            disabled={UI.invite_toggled}
            onClick={handleToggle}
            style={buttonStyle}
          >
            Invite
          </Button>
        </Column>
      </Row>

      {UI.invite_toggled ? <Invite {...props} /> : null}

      <Row>
        <Column xs={12}>
          { people.length > 0
            ? <PeopleTable {...props} />
            : <Empty /> }
        </Column>
      </Row>
    </div>
  );
};

People.propTypes = {
  UI: React.PropTypes.object,
  handleToggle: React.PropTypes.func,
  people: React.PropTypes.array,
};

module.exports = People;