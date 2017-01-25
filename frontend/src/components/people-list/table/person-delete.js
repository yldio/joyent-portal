const React = require('react');
const Styled = require('styled-components');

const {
  default: styled
} = Styled;

const PlainButton = styled.button`
  background: transparent;
  font-size: inherit;
  border: none;
  zIndex: 0;
  font-family: inherit;
  color: inherit;
`;

const PersonDelete = (props) => {

  const {
    personIndex,
    orgIndex,
    removeMember
  } = props;

  const _onClick = () => removeMember({
    personIndex,
    orgIndex
  });

  return (
    <PlainButton onClick={_onClick} >
      Delete
    </PlainButton>
  );
};

PersonDelete.propTypes = {
  orgIndex: React.PropTypes.number,
  personIndex: React.PropTypes.number,
  removeMember: React.PropTypes.func,
};

module.exports = PersonDelete;