import React from 'react';
import { Row } from 'react-styled-flexboxgrid';
import {
  SectionList,
  SectionListItem,
  SectionListNavLink
} from 'joyent-ui-toolkit';

const SectionNav = () => (
  <Row>
    <SectionList>
      <SectionListItem>
        <SectionListNavLink to="/" className="active">
          Instances
        </SectionListNavLink>
      </SectionListItem>
      <SectionListItem>Custom images</SectionListItem>
      <SectionListItem>Docker images</SectionListItem>
      <SectionListItem>Docker registries</SectionListItem>
    </SectionList>
  </Row>
);

export default SectionNav;
