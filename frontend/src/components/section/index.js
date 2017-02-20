import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import Li from '@ui/components/horizontal-list/li';
import NavLink from '@ui/components/nav-link';
import { breakpoints } from '@ui/shared/constants';
import { remcalc } from '@ui/shared/functions';
import PropTypes from '@root/prop-types';
import Ul from '@ui/components/horizontal-list/ul';
import Breadcrumb from '@components/breadcrumb';

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

const Section = (props) => {
  const {
    children,
    links = []
  } = props;

  const navLinks = links.map((link) => (
    <StyledHorizontalListItem key={link.name}>
      <NavLink activeClassName='active' to={link.pathname}>
        <FormattedMessage id={link.name} />
      </NavLink>
    </StyledHorizontalListItem>
  ));

  return (
    <div>
      <Breadcrumb {...props} />
      <StyledHorizontalList name='project-nav'>
        {navLinks}
      </StyledHorizontalList>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link)
};

export default Section;
