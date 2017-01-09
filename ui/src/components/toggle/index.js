const constants = require('../../shared/constants');
const composers = require('../../shared/composers');
const fns = require('../../shared/functions');
const React = require('react');
const Styled = require('styled-components');

const {
  boxes,
  colors,
  typography
} = constants;

const {
  pseudoEl,
  baseBox
} = composers;

const {
  remcalc,
  rndId
} = fns;

const {
  default: styled,
  keyframes
} = Styled;

const classNames = {
  label: rndId()
};

const slide = (
  direction = 'left'
) => {
  keyframes`
    from {
      left: 0;
    }
  
    to {
      left: 100%;
    }
  `;
}

const backgroundGradient = (index) => {
  const colorDefault = index === 1  ? 'red' : 'blue';
  const colorAlt = index === 1  ? 'blue' : 'red';
  debugger
  return css`
    background: linear-gradient(to right, ${colorDefault} 50%, ${colorAlt} 50%);
  `;
}


const StyledText = styled.span`
  padding: 1rem;
  display: inline-block;
`;

const StyledDiv = styled.div`
  display: inline-block;
  background-color: ${colors.brandInactive};
  animation: ${slide} 0.5s forwards;
  
  ${baseBox()}
`;


const StyledInput_1 = styled.input`
  display: none;

  & + span {
    background: #ff3232;
    background: linear-gradient(to right, red 50%, blue 50%);
    background-size: 200% 100%;
    background-position:left bottom;
    transition:all .5s ease;
  }
  
  &:checked {
      
      
    & + span {
      background-position: right bottom;
    }
  }
`;

const StyledInput_2 = styled.input`
  display: none;

  & + span {
    background: #ff3232;
    background: linear-gradient(to right, blue 50%, red 50%);
    background-size: 200% 100%;
    background-position:right bottom;
    transition:all .5s ease;
  }
  
  &:checked {
      
      
    & + span {
      background-position: left bottom;
    }
  }
`;

const StyledLabel = styled.label`
`;


const Toggle = ({
  checked,
  className,
  defaultChecked,
  options = [
    "On",
    "Off"
  ],
  id = rndId(),
  style
}) => {
  return (
    <StyledDiv>
      <StyledLabel>
        <StyledInput_1 defaultChecked name="toggler" type="radio" value={options[0]} index={1} />
        <StyledText>{options[0]}</StyledText>
      </StyledLabel>
      <StyledLabel>
        <StyledInput_2 name="toggler" type="radio" value={options[1]} index={2} />
        <StyledText>{options[1]}</StyledText>
      </StyledLabel>
    </StyledDiv>
  );
};

Toggle.propTypes = {
  checked: React.PropTypes.bool,
  className: React.PropTypes.string,
  defaultChecked: React.PropTypes.bool,
  id: React.PropTypes.string,
  style: React.PropTypes.object
};

module.exports = Toggle;
