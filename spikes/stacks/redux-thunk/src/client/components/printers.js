const React = require('react');

module.exports = ({
  printers = [],
  onClick
}) => {
  const _onClick = (id) => {
    return () => {
      onClick(id);
    };
  };

  const lis = printers.map(({
    name,
    id
  }) => {
    return (
      <li key={id}>
        <a onClick={_onClick(id)}>{name}</a>
      </li>
    );
  });

  return (
    <ul>
      {lis}
    </ul>
  );
};
