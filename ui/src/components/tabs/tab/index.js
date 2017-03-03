import styled from 'styled-components';
import { Baseline } from '../../../shared/composers';
import { boxes, colors } from '../../../shared/constants';
import { remcalc, rndId } from '../../../shared/functions';
import React from 'react';

const classNames = {
  label: rndId(),
  panel: rndId()
};

const StyledTab = styled.div`
  display: inline;
`;

const StyledRadio = styled.input`
  clip: rect(0 0 0 0);
  height: ${remcalc(1)};
  opacity: 0;
  width: ${remcalc(1)};

  &:checked {
    & + .${classNames.label} {
      border-bottom-width: 0;
    }

    & ~ .${classNames.panel} {
      display: inline;
    }
  }
`;

const StyledLabel = styled.label`
  background: transparent;
  display: inline-block;
  font-size: ${remcalc(20)};
  margin: 0 0.5rem 0 0;
  vertical-align: bottom;
  box-shadow: inset ${remcalc(2)} -6px 10px 0px rgba(0,0,0,0.06);
`;

const StyledPanel = styled.div`
  display: inline-block;
  height: 0;
  overflow: hidden;
  position: relative;
  width: 0;
`;

const StyledContent = styled.div`
  background: ${colors.inactive.default};
  border: ${boxes.border.unchecked};
  box-sizing: border-box;
  box-shadow: 0 ${remcalc(-1)} ${remcalc(26)} 0 rgba(0, 0, 0, 0.2);
  display: block;
  float: left;
  font-size: ${remcalc(16)};
  margin-top: ${remcalc(-9)};
  padding: ${remcalc(20)} ${remcalc(25)};
  width: 100%;
`;

const Tab = ({
  className,
  children,
  checked,
  defaultChecked = false,
  disabled = false,
  id,
  name,
  title = '',
  style
}) => {
  const tabId = rndId();

  return (
    <StyledTab className={className}>
      <StyledRadio
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        id={tabId}
        name={name}
        type='radio'
      />
      <StyledLabel
        className={classNames.label}
        htmlFor={tabId}
      >
        {title}
      </StyledLabel>
      {children ? (
        <StyledPanel className={classNames.panel}>
          <StyledContent>
            {children}
          </StyledContent>
        </StyledPanel>
      ) : null}
    </StyledTab>
  );
};

Tab.propTypes = {
  checked: React.PropTypes.bool,
  children: React.PropTypes.node,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  disabled: React.PropTypes.bool,
  id: React.PropTypes.string,
  name: React.PropTypes.string,
  style: React.PropTypes.object,
  title: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.node
  ])
};

export default Baseline(
  Tab
);
