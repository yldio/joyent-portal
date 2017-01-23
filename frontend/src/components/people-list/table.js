const React = require('react');

const Table = require('@ui/components/table-data-table');
const Checkbox  = require('@ui/components/checkbox');

const PeopleTable = ({
  people = []
}) => {

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

  const data = people.map( (person) => ({
    checkbox: <Checkbox />,
    name: person.name,
    status: person.status,
    role: person.role,
    bin: ''
  }));

  return (
    <Table
      columns={columns}
      data={data}
    />
  );
};

PeopleTable.propTypes = {
  people: React.PropTypes.array
};

module.exports = PeopleTable;