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
  person = {},
  options = []
}) => {
  return (
    <Tooltip
      arrowPosition={arrowPosition}
      key={person.uuid}
      style={tooltipStyle}
    >
      {options.map((o, i) => <li key={i}>{o}</li>)}
    </Tooltip>
  );
};

module.exports.propTypes = {
  options: React.PropTypes.array,
  person: React.PropTypes.object,
};