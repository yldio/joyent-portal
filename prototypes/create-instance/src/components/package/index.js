import React from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';

import {
  Card,
  CardSubTitle,
  CardTitle,
  CardView,
  CardFooter,
  CardMeta
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
  <PackageStyled transparent selected={selected} onClick={onClick}>
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
  </PackageStyled>
);

export default Package;
