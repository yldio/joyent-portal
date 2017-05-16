// TODO need to sort out navlinks

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

import { breakpoints } from '@ui/shared/constants';
import { remcalc } from '@ui/shared/functions';

import { LayoutContainer } from '@components/layout';
import { Ul, Li } from '@ui/components/horizontal-list';

const StyledHorizontalList = styled(Ul)`
  padding: 0;
`;

const StyledHorizontalListItem = styled(Li)`
  ${breakpoints.smallOnly`
    display: block;
  `}

  & + li {
    margin-left: ${remcalc(21)};
  }
`;

const Menu = ({
  links
}) => {

  const navLinks = links.map((link) => {
    return (
      <StyledHorizontalListItem key={link.name}>
        <NavLink activeClassName='active' to={link.pathname}>
          { link.name }
        </NavLink>
      </StyledHorizontalListItem>
    );
  });

  return (
    <LayoutContainer>
      <StyledHorizontalList>
        {navLinks}
      </StyledHorizontalList>
    </LayoutContainer>
  );
};

Menu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      pathname: PropTypes.string
    }))
};

export default Menu;
