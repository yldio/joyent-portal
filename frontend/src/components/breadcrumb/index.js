import React from 'react';
import styled from 'styled-components';
import flatten from 'lodash.flatten';

import Container from '@ui/components/container';
import Row from '@ui/components/row';
import Column from '@ui/components/column';
import { H2 } from '@ui/components/base-elements';
import NavLink from '@ui/components/nav-link';
import PropTypes from '@root/prop-types';
import { remcalc, unitcalc } from '@ui/shared/functions';
import { colors } from '@ui/shared/constants';

// Main Contonent Wrapper Styles
const StyledDiv = styled.div`
  border-bottom: solid ${remcalc(1)} ${colors.base.grey};
  padding: ${unitcalc(4.5)} 0 ${unitcalc(4.5)} 0;
  margin-bottom: ${remcalc(18)};
`;

const BreadcrumbA = styled(NavLink)`
  text-decoration: none;
  color: ${colors.base.primary};
`;

const BreadcrumbSpan = styled.span`
  color: ${colors.base.text};
`;

function getNameLink(name) {
  return flatten(name.map((part, i) => {
    if (!part.name) {
      return null;
    }

    const link = (
      <BreadcrumbA key={part.pathname} to={part.pathname}>
        {part.name}
      </BreadcrumbA>
    );

    const key = `${part.pathname}${i}`;
    const slash = (
      <BreadcrumbSpan key={key}> / </BreadcrumbSpan>
    );

    return (i === 0) ? link : [
      slash,
      link
    ];
  }));
}

const StyledH2 = styled(H2)`
  color: ${colors.base.primary};
  margin: 0;
`;

const Breadcrumb = ({
  children,
  links = [],
  name = []
}) => (
  <Container>
    <Row>
      <Column xs={12}>
        <StyledDiv>
          <StyledH2>
            {getNameLink(name)}
          </StyledH2>
        </StyledDiv>
      </Column>
    </Row>
  </Container>
);

Breadcrumb.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link),
  name: React.PropTypes.arrayOf(PropTypes.link)
};

export default Breadcrumb;
