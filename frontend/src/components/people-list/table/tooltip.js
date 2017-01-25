const React = require('react');

const Tooltip = require('@ui/components/tooltip');

const tooltipStyle = {
  position: 'absolute',
  top: '30px',
  zIndex: 1
};

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

module.exports = ({
  handleSelect,
  person = {},
  personIndex,
  options = [],
}) => {

  const _options = options.map( (option, i) => {

    const payload = {
      person: {
        uuid: person.uuid,
        status: person.status,
        role: option
      },
      personIndex
    };

    const _onClick = () => handleSelect(payload);

    return (
      <li
        key={i}
        onClick={_onClick}
        role="listbox"
        tabIndex="0"
      >
        {option}
      </li>
    );
  });

  return (
    <Tooltip
      arrowPosition={arrowPosition}
      key={person.uuid}
      style={tooltipStyle}
    >
      {_options}
    </Tooltip>
  );
};

module.exports.propTypes = {
  handleSelect: React.PropTypes.func,
  options: React.PropTypes.array,
  person: React.PropTypes.object,
  personIndex: React.PropTypes.number,
};