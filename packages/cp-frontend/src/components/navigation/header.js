import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Img } from 'normalized-styled-components';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';

import Logo from '@assets/triton_logo.png';
import { Col, Row } from 'react-styled-flexboxgrid';
import { P } from 'joyent-ui-toolkit';

const StyledHeader = styled.div`
  background-color: ${props => props.theme.primaryDarkBrand};
  padding: ${unitcalc(2.5)} ${unitcalc(3)} ${unitcalc(2)} ${unitcalc(3)};
`;

const StyledLogo = Img.extend`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

const StyledP = styled(P)`
  color: ${props => props.theme.white};
  font-weight: 600;
  margin: ${unitcalc(0.5)} 0 0 0;
`;

const Header = ({ datacenter, username }) => (
  <StyledHeader>
    <Row>
      <Col xs={6} sm={8} md={10}>
        <Link to="/">
          <StyledLogo src={Logo} />
        </Link>
      </Col>
      <Col xs={3} sm={2} md={1}>
        <StyledP>{datacenter}</StyledP>
      </Col>
      <Col xs={3} sm={2} md={1}>
        <StyledP>{username}</StyledP>
      </Col>
    </Row>
  </StyledHeader>
);

Header.propTypes = {
  datacenter: PropTypes.string,
  username: PropTypes.string
};

export default Header;
