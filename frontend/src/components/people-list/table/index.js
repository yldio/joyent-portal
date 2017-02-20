const React = require('react');
const Styled = require('styled-components');

const Table = require('@ui/components/table-data-table');
const Form  = require('@ui/components/form');

const fns  = require('@ui/shared/functions');

const PersonStatus = require('./person-status');
const PersonRole = require('./person-role');
const PersonDelete = require('./person-delete');

const {
  default: styled
} = Styled;

const {
  remcalc
} = fns;

const {
  Checkbox,
  FormGroup
} = Form;

const PeopleTable = (props) => {
  const {
    handleRoleTooltip,
    handleStatusTooltip,
    handleMemberUpdate,
    people = [],
    parentIndex,
    removeMember,
    UI = {}
  } = props;

  const columns = [{
    title: (
      <FormGroup>
        <Checkbox />
      </FormGroup>
    ),
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
        membersStatusOptions={UI.members_status}
        parentIndex={parentIndex}
        person={person}
        personIndex={index}
        toggledID={UI.member_status_tooltip}
      />
    );

    const role = (person) => (
      <PersonRole
        handleMemberUpdate={handleMemberUpdate}
        handleRoleTooltip={handleRoleTooltip}
        membersRolesOptions={UI.members_roles}
        parentIndex={parentIndex}
        person={person}
        personIndex={index}
        toggledID={UI.member_role_tooltip}
      />
    );

    const remove = (person) => (
      <PersonDelete
        parentIndex={parentIndex}
        personIndex={index}
        removeMember={removeMember}
      />
    );

    return {
      checkbox: (
        <FormGroup>
          <Checkbox />
        </FormGroup>
      ),
      name: person.name,
      status: status(person),
      role: role(person),
      bin: people.length > 1 ? remove(person) : null
    };
  });

  const StyledWrapper = styled.div`
    margin-top: ${remcalc(40)};
  `;

  return (
    <StyledWrapper>
      <Table
        columns={columns}
        data={data}
      />
    </StyledWrapper>
  );
};

PeopleTable.propTypes = {
  UI: React.PropTypes.object,
  handleMemberUpdate: React.PropTypes.func,
  handleRoleTooltip: React.PropTypes.func,
  handleStatusTooltip: React.PropTypes.func,
  parentIndex: React.PropTypes.number,
  people: React.PropTypes.array,
  removeMember: React.PropTypes.func
};

module.exports = PeopleTable;
