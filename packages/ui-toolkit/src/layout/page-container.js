import styled from 'styled-components';
import remcalc from 'remcalc';

export default styled.div`
  display: flex;
  flex: 1 1 auto;
  position: relative;
  flex-flow: column;
  padding-bottom: ${remcalc(60)};
`;
