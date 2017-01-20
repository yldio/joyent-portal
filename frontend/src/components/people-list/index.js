const React = require('react');

const PersonItem = require('@components/people-item');
const PropTypes = require('@root/prop-types');

const PeopleList = ({
  people = []
}) => {

  const peopleList = people.map((person) => (
    <PersonItem
      key={person.uuid}
      person={person}
    />
  ));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Member</th>
            <th>Status</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {peopleList}
        </tbody>
      </table>
    </div>
  );
};

PeopleList.propTypes = {
  people: React.PropTypes.arrayOf(PropTypes.person),
};

module.exports = PeopleList;
