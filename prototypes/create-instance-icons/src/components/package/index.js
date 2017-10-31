import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row } from 'react-styled-flexboxgrid';

import {
  Card,
  InstancesIconLight,
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo,
  CardInfoLabel,
  CardInfoIconContainer
} from 'joyent-ui-toolkit';

const PackageStyled = styled(Card)`
  margin-right: ${remcalc(18)};
  margin-bottom: ${remcalc(18)};
`;

const Package = ({
  pack: { price, memory, vcpus, disk, group, ssd },
  selected,
  onClick
}) => (
  <Row>
    <Card collapsed headed onClick={onClick}>
      <CardHeader white>
        <CardMeta>
          <CardTitle>Nginx</CardTitle>
          <CardDescription>
            <CardInfo>
              <CardInfoIconContainer>
                <InstancesIconLight />
              </CardInfoIconContainer>
              <CardInfoLabel left light>
                4 of 4 instances
              </CardInfoLabel>
            </CardInfo>
          </CardDescription>
        </CardMeta>
        <CardOptions />
      </CardHeader>
    </Card>
  </Row>
);

export default Package;

/* <PackageStyled transparent selected={selected} onClick={onClick}>
    <CardView>
      <CardMeta>
        <CardTitle selected={selected}>${price} per hour</CardTitle>
        <CardSubTitle selected={selected}>{memory} GB RAM</CardSubTitle>
        <CardSubTitle selected={selected}>{vcpus} vCPUs</CardSubTitle>
        <CardSubTitle selected={selected}>{disk} TB disk</CardSubTitle>
        <CardSubTitle selected={selected}>
          {ssd ? 'SSD' : 'Magnetic'}
        </CardSubTitle>
        <CardFooter selected={selected}>{group}</CardFooter>
      </CardMeta>
    </CardView>
  </PackageStyled> */

// <Tr actionable>
//   <Td border="right" middle center>
//     HB
//   </Td>
//   <Td>
//     <H4>percona_high-ram-32_1</H4>
//   </Td>
//   <Td>Provisioning</Td>
//   <Td>2252839a</Td>
//   <Td>HB</Td>
// </Tr>;
