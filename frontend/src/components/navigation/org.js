import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import Avatar from '@ui/components/avatar';
import Container from '@ui/components/container';
import NavLink from '@ui/components/nav-link';
import { colors } from '@ui/shared/constants';
import PropTypes from '@root/prop-types';
import { orgsSelector } from '@state/selectors';
import { remcalc } from '@ui/shared/functions';
import Tabs, { Tab } from '@ui/components/tabs';


const StyledNav = styled.div`
  background-color: #f2f2f2;

  & ul {
    height: ${remcalc(60)};
    margin: 0;
  }
`;

const NavigationLinkContainer = styled.div`
  position: relative;
  color: ${colors.base.grey};
  height: ${remcalc(24)};
  padding: ${remcalc(14)};

  border: ${remcalc(1)} solid ${colors.base.grey};
  border-bottom-width: 0;

  &.active {
    background-color: ${colors.base.background};
  }
`;

const OrgImage = styled.div`
  float: left;
`;

const OrgAvatar = styled(Avatar)`
  display: block;
`;

const OrgName = styled.span`
  margin-left: ${remcalc(12)};
  margin-top: ${remcalc(3)};
  color: ${colors.base.text}
`;

const NavLi = styled(NavLink)`
  display: inline-block;
  text-decoration: none;
`;

const StyledTabs = styled(Tabs)`
  padding-top: ${remcalc(12)}
`;

const OrgNavigation = ({
  orgs = []
}) => {
  const navLinks = orgs.map(({
    id,
    name,
    image
  }) => {
    const to = `/${id}`;
    const content = () => (
      <NavLi activeClassName='active' to={to}>{({
        isActive
      }) =>
        <NavigationLinkContainer className={isActive ? 'active' : ''}>
          <OrgImage>
            <OrgAvatar
              height={remcalc(26)}
              name={name}
              src={image}
              width={remcalc(26)}
            />
          </OrgImage>
          <OrgName>
            {name}
          </OrgName>
        </NavigationLinkContainer>
      }</NavLi>
    );

    return (
      <Tab title={content()} key={to} />
    );
  });

  return (
    <StyledNav>
      <Container>
        <StyledTabs name='organisation-navigation-group'>
          {navLinks}
        </StyledTabs>
      </Container>
    </StyledNav>
  );
};

OrgNavigation.propTypes = {
  orgs: React.PropTypes.arrayOf(PropTypes.org)
};

const mapStateToProps = (state) => ({
  orgs: orgsSelector(state)
});

export default connect(
  mapStateToProps
)(OrgNavigation);
