import React from 'react';
import { Row } from 'react-styled-flexboxgrid';
import { SectionList, SectionListItem } from 'joyent-ui-toolkit';

const SectionNav = () => (
  <Row>
    <SectionList>
      <SectionListItem to="/" className="active">
        Instances
      </SectionListItem>
      <SectionListItem>Custom images</SectionListItem>
      <SectionListItem>Docker images</SectionListItem>
      <SectionListItem>Docker registries</SectionListItem>
    </SectionList>
  </Row>
);

export default SectionNav;
