import React from 'react';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Row, Col } from 'react-styled-flexboxgrid';
import titleCase from 'title-case';
import { Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';
import styled from 'styled-components';

import { Label, DotIcon, H2 } from 'joyent-ui-toolkit';

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

const HorizontalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(18)};
  @media (max-width: 767px) {
    background: transparent;
    height: ${remcalc(12)};
  }
`;

const DotIconStyled = styled(DotIcon)`
  border-radius: 50%;
  margin-right: ${remcalc(6)};
  margin-top: ${remcalc(1)};
`;

const GreyLabel = styled(Label)`
  opacity: 0.5;
  padding-right: ${remcalc(3)};
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 767px) {
    display: block;
  }
`;

export default ({ instance }) => [
  <Row middle="xs">
    <Col xs={12}>
      <H2>{instance.package.name}</H2>
    </Col>
  </Row>,
  <Margin top={2} bottom={3}>
    <Flex>
      <Label>
        {instance.image ? titleCase(instance.image.name) : 'Custom Image'}
      </Label>
      <HorizontalDivider />
      <Label>
        {instance.docker
          ? 'Infrastructure Container'
          : 'Hardware Virtual Machine'}
      </Label>
      <HorizontalDivider />
      <Flex>
        <DotIconStyled
          width={remcalc(11)}
          height={remcalc(11)}
          color={stateColor[instance.state]}
        />
        {titleCase(instance.state)}
      </Flex>
    </Flex>
    <Margin top={1}>
      <Flex>
        <Flex>
          <GreyLabel>Created: </GreyLabel>
          <Label> {distanceInWordsToNow(instance.created)} ago</Label>
        </Flex>
        <HorizontalDivider />
        <Flex>
          <GreyLabel>Updated: </GreyLabel>
          <Label> {distanceInWordsToNow(instance.updated)} ago</Label>
        </Flex>
      </Flex>
    </Margin>
  </Margin>
];
