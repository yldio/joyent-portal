import React from 'react';
import styled from 'styled-components';
import { Grid } from 'react-styled-flexboxgrid';
import { Link } from 'react-router-dom';
import forceArray from 'force-array';
import PropTypes from 'prop-types';
import remcalc from 'remcalc';

import { Breadcrumb, BreadcrumbItem } from 'joyent-ui-toolkit';

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  cursor: pointer;

  &:visited {
    color: inherit;
  }
`;

const BreadcrumbContainer = styled.div`
  border-bottom: solid ${remcalc(1)} ${props => props.theme.grey};
`;

const getBreadcrumbItems = (...links) =>
  forceArray(links).map(({ pathname, name }, i) => {
    const item =
      i + 1 >= links.length ? (
        name
      ) : (
        <BreadcrumbLink to={pathname}>{name}</BreadcrumbLink>
      );

    return <BreadcrumbItem key={name}>{item}</BreadcrumbItem>;
  });

const NavBreadcrumb = ({ links = [] }) => (
  <BreadcrumbContainer>
    <Grid>
      <Breadcrumb>{getBreadcrumbItems(...links)}</Breadcrumb>
    </Grid>
  </BreadcrumbContainer>
);

NavBreadcrumb.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pathname: PropTypes.string
    })
  )
};

export default NavBreadcrumb;
