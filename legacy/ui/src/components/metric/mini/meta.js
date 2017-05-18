import { remcalc } from '../../../shared/functions';
import { Baseline } from '../../../shared/composers';
import { colors } from '../../../shared/constants';
import styled from 'styled-components';
import React from 'react';

const OuterBox = styled.div`
  box-sizing: border-box;
  height: ${remcalc(53)};
  padding: ${remcalc(8)} ${remcalc(12)};
  border-bottom: ${remcalc(1)} solid ${colors.seperator};
`;

const InnerBox = styled.div`
  width: 100%;
  height: ${remcalc(36)};
`;

const Meta = ({
  children,
  ...props
}) => (
  <OuterBox {...props}>
    <InnerBox>
      {children}
    </InnerBox>
  </OuterBox>
);

Meta.propTypes = {
  children: React.PropTypes.node
};

export default Baseline(
  Meta
);
