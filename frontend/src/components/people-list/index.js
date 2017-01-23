const React = require('react');

const PropTypes = require('@root/prop-types');
const Table = require('@ui/components/table-data-table');

const PeopleList = ({
  people = []
}) => {
  const columns = [{
    title: 'Member',
  }, {
    title: 'Status',
  }, {
    title: 'Role',
  }, {
    title: '', // Empty title for delete
  }];

  const data = [];

  people.forEach( (person) => {
    data.push({
      name: person.name,
      status: person.status,
      role: person.role,
    });
  });

  return (
    <Table
      columns={columns}
      data={data}
    />
  );
};

PeopleList.propTypes = {
  people: React.PropTypes.arrayOf(PropTypes.person),
};

module.exports = PeopleList;