import React from 'react';
import styled from 'styled-components';

const PlainButton = styled.button`
  background: transparent;
  font-size: inherit;
  border: none;
  zIndex: 0;
  font-family: inherit;
  color: inherit;
`;

const PersonDelete = ({
  personIndex,
  parentIndex,
  removeMember
}) => {
  const _onClick = () => removeMember({
    personIndex,
    parentIndex
  });

  return (
    <PlainButton onClick={_onClick} >
      Delete
    </PlainButton>
  );
};

PersonDelete.propTypes = {
  parentIndex: React.PropTypes.number,
  personIndex: React.PropTypes.number,
  removeMember: React.PropTypes.func
};

export default PersonDelete;
