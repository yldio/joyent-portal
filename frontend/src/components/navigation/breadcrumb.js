import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { remcalc, unitcalc } from '@ui/shared/functions';
import { colors } from '@ui/shared/constants';

import Container from '@ui/components/container';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { H2 } from '@ui/components/base-elements';

const StyledDiv = styled.div`
  border-bottom: solid ${remcalc(1)} ${colors.base.grey};
  padding: ${unitcalc(4.5)} 0 ${unitcalc(4.5)} 0;
  margin-bottom: ${remcalc(18)};
`;

const StyledH2 = styled(H2)`
  color: ${colors.base.primary};
  margin: 0;
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: ${colors.base.primary};
`;

const BreadcrumbSpan = styled.span`
  color: ${colors.base.text};
`;

function getBreadcrumbLinks(links) {
  if(links.length) {
    return links.reduce((breadcrumb, link, index) => {
      if(breadcrumb.length) {
        breadcrumb.push(
          <BreadcrumbSpan key={breadcrumb.length}> / </BreadcrumbSpan>
        );
      }
      if(index < links.length - 1) {
        breadcrumb.push(
          <BreadcrumbLink key={breadcrumb.length} to={link.pathname}>
            {link.name}
          </BreadcrumbLink>
        );
      }
      else {
        breadcrumb.push(
          <span key={breadcrumb.length}>
            {link.name}
          </span>
        );
      }
      return breadcrumb;
    }, []);
  }
  return null;
}

const Breadcrumb = ({
  links = []
}) => (
  <Container>
    <Row>
      <Column xs={12}>
        <StyledDiv>
          <StyledH2>
            { getBreadcrumbLinks(links) }
          </StyledH2>
        </StyledDiv>
      </Column>
    </Row>
  </Container>
);

Breadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pathname: PropTypes.string
    }))
};

export default Breadcrumb;
