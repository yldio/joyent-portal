const React = require('react');

const Table = require('@ui/components/table-data-table');
const Checkbox  = require('@ui/components/checkbox');

const PersonStatus = require('./person-status');
const PersonRole = require('./person-role');

const PeopleTable = (props) => {

  const {
    handleRoleTooltip,
    handleStatusTooltip,
    people = [],
    orgUI = {}
  } = props;

  const columns = [{
    title: <Checkbox />,
    width: '5%'
  }, {
    title: 'Member',
    width: '35%'
  }, {
    title: 'Status',
    width: '25%'
  }, {
    title: 'Role',
    width: '25%'
  }, {
    title: '',
    width: '10%' // Empty title for delete
  }];

  const data = people.map( (person) => {
    const status = (person) => (
      <PersonStatus
        handleStatusTooltip={handleStatusTooltip}
        membersStatusOptions={orgUI.members_status}
        person={person}
        toggledID={orgUI.member_status_tooltip}
      />
    );

    const role = (person) => (
      <PersonRole
        handleRoleTooltip={handleRoleTooltip}
        membersRolesOptions={orgUI.members_roles}
        person={person}
        toggledID={orgUI.member_role_tooltip}
      />
    );

    return {
      checkbox: <Checkbox />,
      name: person.name,
      status: status(person),
      role: role(person),
      bin: ''
    };
  });

  return (
    <Table
      columns={columns}
      data={data}
    />
  );
};

PeopleTable.propTypes = {
  handleRoleTooltip: React.PropTypes.func,
  handleStatusTooltip: React.PropTypes.func,
  orgUI: React.PropTypes.object,
  people: React.PropTypes.array,
};

module.exports = PeopleTable;