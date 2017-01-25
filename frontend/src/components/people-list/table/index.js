const React = require('react');

const Table = require('@ui/components/table-data-table');
const Checkbox  = require('@ui/components/checkbox');

const PersonStatus = require('./person-status');
const PersonRole = require('./person-role');

const PeopleTable = (props) => {

  const {
    handleRoleTooltip,
    handleRoleUpdate,
    handleStatusTooltip,
    handleStatusUpdate,
    people = [],
    orgUI = {},
    orgIndex
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

  const data = people.map( (person, index) => {
    const status = (person) => (
      <PersonStatus
        handleStatusTooltip={handleStatusTooltip}
        handleStatusUpdate={handleStatusUpdate}
        membersStatusOptions={orgUI.members_status}
        orgIndex={orgIndex}
        person={person}
        personIndex={index}
        toggledID={orgUI.member_status_tooltip}
      />
    );

    const role = (person) => (
      <PersonRole
        handleRoleTooltip={handleRoleTooltip}
        handleRoleUpdate={handleRoleUpdate}
        membersRolesOptions={orgUI.members_roles}
        orgIndex={orgIndex}
        person={person}
        personIndex={index}
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
  handleRoleUpdate: React.PropTypes.func,
  handleStatusTooltip: React.PropTypes.func,
  handleStatusUpdate: React.PropTypes.func,
  orgIndex: React.PropTypes.number,
  orgUI: React.PropTypes.object,
  people: React.PropTypes.array,
};

module.exports = PeopleTable;