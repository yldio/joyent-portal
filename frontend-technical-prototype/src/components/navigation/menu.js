import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Li from '@ui/components/horizontal-list/li';
import NavLink from '@ui/components/nav-link';
import { breakpoints } from '@ui/shared/constants';
import { remcalc } from '@ui/shared/functions';
import PropTypes from '@root/prop-types';
import Ul from '@ui/components/horizontal-list/ul';
import { LayoutContainer } from '@components/layout';

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
          <FormattedMessage id={link.name} />
        </NavLink>
      </StyledHorizontalListItem>
    );
  });

  // TODO this could be any kind of nav, not just 'project-'...
  return (
    <LayoutContainer>
      <StyledHorizontalList name='project-nav'>
        {navLinks}
      </StyledHorizontalList>
    </LayoutContainer>
  );
};

Menu.propTypes = {
  links: React.PropTypes.arrayOf(PropTypes.link)
};

export default Menu;
