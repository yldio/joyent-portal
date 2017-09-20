import React from 'react';
import PropTypes from 'prop-types';
import forceArray from 'force-array';

import {
  SectionList,
  SectionListItem,
  SectionListNavLink,
  ViewContainer
} from 'joyent-ui-toolkit';

const getMenuItems = (links = []) =>
  links.map(({ pathname, name }) => (
    <SectionListItem key={pathname}>
      <SectionListNavLink activeClassName="active" to={pathname}>
        {name}
      </SectionListNavLink>
    </SectionListItem>
  ));

const Menu = ({ links = [] }) => {
  const _links = forceArray(links);

  if (!_links.length) {
    return null;
  }

  return (
    <ViewContainer plain>
      <SectionList>{getMenuItems(_links)}</SectionList>
    </ViewContainer>
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
