const React = require('react');

const Row = require('@ui/components/row');
const Column = require('@ui/components/column');
const Button = require('@ui/components/button');
const SelectCustom = require('@ui/components/select-custom');

const Invite = (props) => {

  const {
    people = [],
    handleToggle,
    platformMembers
  } = props;

  const InputStyle = {
    float: 'left',
    width: '75%'
  };

  const AddButtonStyle = {
    float: 'right',
    width: '20%'
  };

  const styleInline = {
    display: 'inline-block'
  };

  const selectData = [
    {
      value: 'one',
      label: 'One'
    },
    {
      value: 'two',
      label: 'Two'
    },
    {
      value: 'three',
      label: 'Three'
    },
    {
      value: 'four',
      label: 'Four'
    },
    {
      value: 'five',
      label: 'Five'
    },
    {
      value: 'six',
      label: 'Six'
    }
  ];

  return (
    <Row>
      <Column xs={6}>
        <p>Search for a person by name or email or enter an email address
          to invite someone new.</p>

        <Row>
          <Column xs={12}>
            <SelectCustom
              placeholder="Enter an email address or password"
              multi
              onChange={function noop() {}}
              options={selectData}
            />
            <Button
              style={AddButtonStyle}
              secondary
            >
              Add
            </Button>
          </Column>
        </Row>

        <Button
          secondary
          style={styleInline}
          onClick={handleToggle}
        >
          Cancel
        </Button>

        <Button
          style={styleInline}
        >
          Send Invitation(s)
        </Button>
      </Column>
    </Row>
  );
};

Invite.propTypes = {
  handleToggle: React.PropTypes.func,
  orgUI: React.PropTypes.obj,
  people: React.PropTypes.arrayOf(PropTypes.person)
};

module.exports = Invite;