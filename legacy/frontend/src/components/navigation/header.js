import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { remcalc, unitcalc } from '@ui/shared/functions';
import { colors } from '@ui/shared/constants';

import Logo from '@assets/triton_logo.png';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { P } from '@ui/components/base-elements';

const StyledHeader = styled.div`
  background-color: ${colors.base.primaryDarkBrand};
  padding: ${unitcalc(2.5)} ${unitcalc(3)} ${unitcalc(2)} ${unitcalc(3)};
`;

const StyledLogo = styled.img`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

const StyledP = styled(P)`
  color: ${colors.base.white};
  font-weight: 600;
  margin: ${unitcalc(0.5)} 0 0 0;
`;

const Header = ({
  datacenter,
  username
}) => (
  <StyledHeader>
    <Row>
      <Column md={10} xs={12}>
        <Link to='/'>
          <StyledLogo src={Logo} />
        </Link>
      </Column>
      <Column md={1} xs={6}>
        <StyledP>{datacenter}</StyledP>
      </Column>
      <Column md={1} xs={6}>
        <StyledP>{username}</StyledP>
      </Column>
    </Row>
  </StyledHeader>
);

Header.propTypes = {
  datacenter: PropTypes.string,
  username: PropTypes.string
}

export default Header;
