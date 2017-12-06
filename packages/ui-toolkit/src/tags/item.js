import styled from 'styled-components';
import remcalc from 'remcalc';

export default styled.li`
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  box-sizing: border-box;
  border-radius: ${remcalc(2)};
  font-size: ${remcalc(13)};
  padding: ${remcalc(6)} ${remcalc(12)};
  display: flex;
  align-items: center;
  flex-grow: 1;
`;
