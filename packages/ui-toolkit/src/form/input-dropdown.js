import styled from 'styled-components';
import remcalc from 'remcalc';

const InputDropdown = styled.div`
  background: ${props => props.theme.white};
  border: ${remcalc(1)} solid #d8d8d8;
  box-sizing: border-box;
  border-radius: ${remcalc(4)};
  margin-bottom: ${remcalc(8)};
  margin-top: ${remcalc(8)};
`;

export default InputDropdown;
