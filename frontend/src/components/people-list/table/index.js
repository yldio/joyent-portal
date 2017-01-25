const React = require('react');

const Table = require('@ui/components/table-data-table');
const Checkbox  = require('@ui/components/checkbox');

const PersonStatus = require('./person-status');
const PersonRole = require('./person-role');
const PersonDelete = require('./person-delete');

const PeopleTable = (props) => {

  const {
    handleRoleTooltip,
    handleStatusTooltip,
    handleMemberUpdate,
    people = [],
    orgUI = {},
    orgIndex,
    removeMember
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
        handleMemberUpdate={handleMemberUpdate}
        handleStatusTooltip={handleStatusTooltip}
        membersStatusOptions={orgUI.members_status}
        orgIndex={orgIndex}
        person={person}
        personIndex={index}
        toggledID={orgUI.member_status_tooltip}
      />
    );

    const role = (person) => (
      <PersonRole
        handleMemberUpdate={handleMemberUpdate}
        handleRoleTooltip={handleRoleTooltip}
        membersRolesOptions={orgUI.members_roles}
        orgIndex={orgIndex}
        person={person}
        personIndex={index}
        toggledID={orgUI.member_role_tooltip}
      />
    );

    const remove = (person) => (
      <PersonDelete
        orgIndex={orgIndex}
        personIndex={index}
        removeMember={removeMember}
      />
    );

    return {
      checkbox: <Checkbox />,
      name: person.name,
      status: status(person),
      role: role(person),
      bin: people.length > 1 ? remove(person) : null
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
  handleMemberUpdate: React.PropTypes.func,
  handleRoleTooltip: React.PropTypes.func,
  handleStatusTooltip: React.PropTypes.func,
  orgIndex: React.PropTypes.number,
  orgUI: React.PropTypes.object,
  people: React.PropTypes.array,
  removeMember: React.PropTypes.func,
};

module.exports = PeopleTable;