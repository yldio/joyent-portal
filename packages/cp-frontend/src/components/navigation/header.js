import React from 'react';
import { Link } from 'react-router-dom';
import { Img } from 'normalized-styled-components';
import styled from 'styled-components';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';

import Logo from '@assets/triton_logo.png';
import { Col, Row } from 'react-styled-flexboxgrid';

const StyledHeader = styled.div`
  background-color: ${props => props.theme.primaryDarkBrand};
  padding: ${unitcalc(2.5)} ${unitcalc(3)} ${unitcalc(2)} ${unitcalc(3)};
`;

const StyledLogo = styled(Img)`
  width: ${remcalc(87)};
  height: ${remcalc(25)};
`;

export default () => (
  <StyledHeader>
    <Row>
      <Col lg={12} xs={12}>
        <Link to="/">
          <StyledLogo src={Logo} />
        </Link>
      </Col>
    </Row>
  </StyledHeader>
);
