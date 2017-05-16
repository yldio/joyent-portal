import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { remcalc, unitcalc } from '@ui/shared/functions';
import { colors } from '@ui/shared/constants';

import Logo from '@assets/triton_logo.png';
import Row from '@ui/components/row';
import Column from '@ui/components/column';

const StyledHeader = styled.div`
  background-color: ${colors.base.primaryDarkBrand};
  padding: ${unitcalc(2.5)} ${unitcalc(3)} ${unitcalc(2)} ${unitcalc(3)};
`;

const StyledLogo = styled.img`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

export default () => (
  <StyledHeader>
    <Row>
      <Column lg={12} xs={12}>
        <Link to='/'>
          <StyledLogo src={Logo} />
        </Link>
      </Column>
    </Row>
  </StyledHeader>
);
