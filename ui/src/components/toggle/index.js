const constants = require('../../shared/constants');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  colors
} = constants;

const {
  baseBox
} = composers;

const {
  remcalc,
  rndId
} = fns;

const {
  default: styled,
  css
} = Styled;

const StyledText = styled.span`
  padding: 1rem;
  display: inline-block;
`;

const StyledDiv = styled.div`
  display: inline-block;
  background-color: ${colors.brandInactive};
  
  ${baseBox()}
`;

const inputStyled = css`
  background-size: 200% 100%;
  transition:all .5s ease;
  min-width: ${remcalc(120)};
  text-align: center;
`;


const StyledInput0 = styled.input`
  display: none;

  & + span {
    background: linear-gradient(to right, 
                transparent 50%, 
                ${colors.brandSecondary} 50%);
    background-position: left bottom;
    box-shadow: inset -7px 0 9px -7px rgba(0,0,0,0.4);
    
    ${inputStyled}
  }
  
  &:checked {
      
    & + span {
      background-position: right bottom;
    }
  }
`;

const StyledInput1 = styled.input`
  display: none;

  & + span { 
    background: linear-gradient(to right, 
                ${colors.brandSecondary} 50%, 
                transparent 50%);
    background-position: right bottom;
    
    ${inputStyled}
  }
  
  &:checked {
      
    & + span {
      background-position: left bottom;
    }
  }
`;

/*
TODO: Remove !important - it is used to overirde a global style
 */
const StyledLabel = styled.label`
  margin-bottom: 0 !important;
`;

const Toggle = ({
  checked,
  className,
  defaultChecked,
  options = [
    {
      label: 'On',
      checked: true
    },
    {
      label: 'Off',
      checked: false
    }
  ],
  id = rndId(),
  style
}) => {
  return (
    <StyledDiv>
      {options.map( (option, index) => {

        if ( index >= 2 ) return;

        const customProps = {
          defaultChecked: option.checked,
          name: 'toggler',
          type: 'radio',
          value: option.label,
          id: rndId()
        };

        const InputVarients = {
          input_0: (<StyledInput0 {...customProps} />),
          input_1: (<StyledInput1 {...customProps} />)
        };

        return (
          <StyledLabel
            htmlFor={customProps.id}
            key={index}
          >
            {InputVarients[`input_${index}`]}
            <StyledText>{option.label}</StyledText>
          </StyledLabel>
        );
      })}
    </StyledDiv>
  );
};

Toggle.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  id: React.PropTypes.string,
  options: React.PropTypes.array,
  style: React.PropTypes.object
};

module.exports = Toggle;
