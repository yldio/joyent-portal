const React = require('react');

module.exports = ({
  printers = [],
  locked = '',
  onClick
}) => {
  const _onClick = (id) => {
    return () => {
      onClick(id);
    };
  };

  const lis = printers.map(({
    name,
    lock,
    id
  }) => {
    const msg = (() => {
      if (!lock) {
        return '';
      }

      return (locked === id) ? '(Locked to you)' : `(Locked to ${lock})`;
    })();

    return (
      <li key={id}>
        <a onClick={_onClick(id)}>{name} {msg}</a>
      </li>
    );
  });

  return (
    <ul>
      {lis}
    </ul>
  );
};
