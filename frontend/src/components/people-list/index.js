const React = require('react');

const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const Button = require('@ui/components/button');
const BaseElements = require('@ui/components/base-elements');

const PeopleTable = require('./table');
const Invite = require('./invite');

const {
  H3,
} = BaseElements;

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
        <Column smOffset={9} xs={2}>
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
            : <H3>Noody here!</H3> }
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