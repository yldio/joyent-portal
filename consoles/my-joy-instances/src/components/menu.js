import React from 'react';
import forceArray from 'force-array';
import { Margin } from 'styled-components-spacing';
import { NavLink } from 'react-router-dom';

import {
  SectionList,
  SectionListItem,
  SectionListAnchor,
  ViewContainer
} from 'joyent-ui-toolkit';

const getMenuItems = (links = []) =>
  links.map(({ pathname, name }) => (
    <SectionListItem key={pathname}>
      <SectionListAnchor to={pathname} component={NavLink}>
        {name}
      </SectionListAnchor>
    </SectionListItem>
  ));

const Menu = ({ links = [] }) => {
  const _links = forceArray(links);

  if (!_links.length) {
    return null;
  }

  return (
    <ViewContainer plain>
      <Margin bottom="5" top="2">
        <SectionList>{getMenuItems(_links)}</SectionList>
      </Margin>
    </ViewContainer>
  );
};

export default Menu;
