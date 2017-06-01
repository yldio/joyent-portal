// TODO need to sort out navlinks

import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import remcalc from 'remcalc';

import { breakpoints, Ul, Li } from 'joyent-ui-toolkit';
import { LayoutContainer } from '@components/layout';

const StyledHorizontalList = Ul.extend`
  padding: 0;
`;

const StyledHorizontalListItem = Li.extend`
  ${breakpoints.smallOnly`
    display: block;
  `}

  & + li {
    margin-left: ${remcalc(21)};
  }
`;

const Menu = ({ links }) => {
  const navLinks = links.map(link => {
    return (
      <StyledHorizontalListItem key={link.name}>
        <NavLink activeClassName="active" to={link.pathname}>
          {link.name}
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
    })
  )
};

export default Menu;
