import { rndId, remcalc } from '../../shared/functions';
import { Baseline } from '../../shared/composers';
import { boxes } from '../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const classNames = {
  content: rndId()
};

const StyledInput = styled.input`
  display: none;
  visibility: hidden;

  &:checked {
    & ~ .${classNames.content} {
      border: ${boxes.border.checked};
    }
  }

  &:disabled {
    & ~ .${classNames.content} {
      cursor: not-allowed;
      filter: grayscale(80%);
      opacity: 0.4;
    }
  }
`;

const StyledContent = styled.div`
  border: ${boxes.border.unchecked};
  border-radius: ${remcalc(4)};
  cursor: pointer;
  padding: ${remcalc(36)};

  & img {
    max-width: 100%;
  }
`;

const Widget = ({
  checked = false,
  children,
  className,
  disabled = false,
  id,
  name,
  selectable = 'single',
  style,
  value = name
}) => {
  const type = selectable === 'single' ? 'radio' : 'checkbox';

  return (
    <label
      className={className}
      htmlFor={value}
      id={id}
    >
      <StyledInput
        checked={checked}
        disabled={disabled}
        id={value}
        name={name}
        type={type}
        value={value}
      />
      <StyledContent className={classNames.content}>
        {children}
      </StyledContent>
    </label>
  );
};

Widget.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  selectable: React.PropTypes.string,
  style: React.PropTypes.object,
  value: React.PropTypes.string
};

export default Baseline(
  Widget
);
