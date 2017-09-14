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

const Package = ({ pack: { price, memory, vcpus, disk, group } }) => (
  <PackageStyled transparent>
    <CardView>
      <CardMeta>
        <CardTitle>${price} per hour</CardTitle>
        <CardSubTitle>{memory} GB RAM</CardSubTitle>
        <CardSubTitle>{vcpus} vCPUs</CardSubTitle>
        <CardSubTitle>{disk / 100} TB disk</CardSubTitle>
        <CardSubTitle>SSD</CardSubTitle>

        <CardFooter>{group}</CardFooter>
      </CardMeta>
    </CardView>
  </PackageStyled>
);

export default Package;
