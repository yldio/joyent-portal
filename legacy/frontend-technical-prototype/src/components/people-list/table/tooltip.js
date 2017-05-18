import React from 'react';
import Tooltip from '@ui/components/tooltip';
import styled from 'styled-components';

const StyledTooltip = styled(Tooltip)`
  position: absolute;
  top: 30px;
  z-index: 1;
  right: -36px;
`;

const arrowPosition = {
  bottom: '100%',
  right: '10%'
};

const ExtendedTooltip = ({
  handleSelect,
  person = {},
  personAttr,
  personIndex,
  options = [],
  parentIndex
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
      parentIndex
    };

    const _onClick = () =>
      handleSelect(payload);

    return (
      <li
        key={i}
        onClick={_onClick}
        role='listbox'
        tabIndex='0'
      >
        {option}
      </li>
    );
  });

  return (
    <StyledTooltip
      arrowPosition={arrowPosition}
      key={person.uuid}
    >
      {_options}
    </StyledTooltip>
  );
};

ExtendedTooltip.propTypes = {
  handleSelect: React.PropTypes.func,
  options: React.PropTypes.array,
  parentIndex: React.PropTypes.number,
  person: React.PropTypes.object,
  personAttr: React.PropTypes.string,
  personIndex: React.PropTypes.number
};

export default ExtendedTooltip;
