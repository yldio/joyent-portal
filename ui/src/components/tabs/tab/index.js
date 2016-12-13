const composers = require('../../../shared/composers');
const constants = require('../../../shared/constants');
const fns = require('../../../shared/functions');
const paramCase = require('param-case');
const React = require('react');
const Styled = require('styled-components');

const {
  moveZ
} = composers;

const {
  boxes
} = constants;

const {
  remcalc,
  rndId
} = fns;

const {
  default: styled
} = Styled;

const classNames = {
  label: rndId(),
  panel: rndId()
};

const StyledTab = styled.div`
  display: inline;
`;

const StyledRadio = styled.input`
  clip: rect(0 0 0 0);
  height: 1px;
  opacity: 0;
  width: 1px;

  ${moveZ({
    position: 'fixed',
    amount: -1
  })}

  &:checked {
    & + .${classNames.label} {
      background: #FAFAFA;
      border-bottom-width: 0;
      padding-bottom: ${remcalc(11)};

      ${moveZ({
        amount: 1
      })}
    }

    & ~ .${classNames.panel} {
      display: inline;
    }
  }
`;

const StyledLabel = styled.label`
  background: #F2F2F2;
  border: ${boxes.border.unchecked};
  color: #646464;
  display: inline-block;
  font-size: ${remcalc(20)};
  left: 1px;
  margin-left: -1px;
  margin-bottom: 0;
  padding: ${remcalc(10)};
  position: relative;
  vertical-align: bottom;
`;

const StyledPanel = styled.div`
  display: inline-block;
  height: 0;
  overflow: hidden;
  position: relative;
  width: 0;
`;

const StyledContent = styled.div`
  background: #FAFAFA;
  border: ${boxes.border.unchecked};
  box-sizing: border-box;
  display: block;
  float: left;
  font-size: ${remcalc(16)};
  margin-top: ${remcalc(-9)};
  padding: ${remcalc('0 20')};
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
  const tabId = paramCase(title);

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
      <StyledLabel className={classNames.label} htmlFor={tabId}>
        {title}
      </StyledLabel>
      <StyledPanel className={classNames.panel}>
        <StyledContent>
          {children}
        </StyledContent>
      </StyledPanel>
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
  title: React.PropTypes.string
};

module.exports = Tab;
