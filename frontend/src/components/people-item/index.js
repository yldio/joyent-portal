const React = require('react');

const PropTypes = require('@root/prop-types');
// const List = require('@ui/components/list');

// const {
//   ListItem,
//   ListItemView,
//   ListItemMeta,
//   ListItemTitle,
//   ListItemOptions
// } = List;

const PersonItem = ({
  person = {},
}) => {

  return (
    <tr>
      <td>{person.uuid}</td>
      <td>{person.uuid}</td>
      <td>{person.uuid}</td>
    </tr>
  );
};

PersonItem.propTypes = {
  person: PropTypes.person,
};

module.exports = PersonItem;