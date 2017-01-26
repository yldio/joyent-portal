const React = require('react');

const Tooltip = require('@ui/components/tooltip');

const tooltipStyle = {
  position: 'absolute',
  top: '30px',
  zIndex: 1,
  right: '-36px',
};

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

module.exports = ({
  handleSelect,
  person = {},
  personAttr,
  personIndex,
  options = [],
  parentIndex,
}) => {

  const _options = options.map( (option, i) => {

    const payload = {
      person: {
        uuid: person.uuid,
        status: person.status,
        role: person.role,
        [`${personAttr}`]: option
      },
      personIndex,
      parentIndex,
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
  parentIndex: React.PropTypes.number,
  person: React.PropTypes.object,
  personAttr: React.PropTypes.string,
  personIndex: React.PropTypes.number,
};