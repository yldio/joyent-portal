import styled from 'styled-components';
import { typography } from '@ui/shared/composers';
import React from 'react';

const PlainButton = styled.button`
  background: transparent;
  font-size: inherit;
  border: none;
  zIndex: 0;
  font-family: inherit;
  color: inherit;

  ${typography.libreFranklin};
  ${typography.normal};
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
