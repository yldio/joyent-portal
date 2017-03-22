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

const Section = (props) => {
  const {
    children,
    links = []
  } = props;

  const navLinks = links.map((link) => {
    const to = link.name === 'instances' ?
      // eslint-disable-next-line max-len
      'https://projects.invisionapp.com/share/YDAKI8CW4#/screens/224677771_instances' :
      link.pathname;
    return (
      <StyledHorizontalListItem key={link.name}>
        <NavLink activeClassName='active' to={to}>
          <FormattedMessage id={link.name} />
        </NavLink>
      </StyledHorizontalListItem>
    );
  });

  return (
    <div>
      <LayoutContainer>
        <Breadcrumb {...props} />
        <StyledHorizontalList name='project-nav'>
          {navLinks}
        </StyledHorizontalList>
      </LayoutContainer>
      {children}
    </div>
  );
};

Section.propTypes = {
  children: React.PropTypes.node,
  links: React.PropTypes.arrayOf(PropTypes.link)
};

export default Section;
