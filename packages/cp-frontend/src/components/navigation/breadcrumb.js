import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Grid, Col, Row } from 'react-styled-flexboxgrid';
import remcalc from 'remcalc';
import unitcalc from 'unitcalc';

import { H2 } from 'joyent-ui-toolkit';

const StyledDiv = styled.div`
  border-bottom: solid ${remcalc(1)} ${props => props.theme.grey};
  padding: ${unitcalc(4.5)} 0 ${unitcalc(4.5)} 0;
  margin-bottom: ${remcalc(18)};
`;

const StyledH2 = styled(H2)`
  color: ${props => props.theme.primary};
  margin: 0;
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.primary};
`;

const BreadcrumbSpan = styled.span`
  color: ${props => props.theme.text};
`;

function getBreadcrumbLinks(links) {
  if (links.length) {
    return links.reduce((breadcrumb, link, index) => {
      if (breadcrumb.length) {
        breadcrumb.push(
          <BreadcrumbSpan key={breadcrumb.length}> / </BreadcrumbSpan>
        );
      }
      breadcrumb.push(
        <BreadcrumbLink key={breadcrumb.length} to={link.pathname}>
          {link.name}
        </BreadcrumbLink>
      );
      return breadcrumb;
    }, []);
  }
  return null;
}

const Breadcrumb = ({ links = [] }) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <StyledDiv>
          <StyledH2>
            {getBreadcrumbLinks(links)}
          </StyledH2>
        </StyledDiv>
      </Col>
    </Row>
  </Grid>
);

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pathname: PropTypes.string
    })
  )
};

export default Breadcrumb;
