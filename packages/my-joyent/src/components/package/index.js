import React from 'react';
import {
  Card,
  CardSubTitle,
  CardTitle,
  CardView,
  CardFooter,
  CardMeta
} from 'joyent-ui-toolkit';

const Package = ({ pack: { price, memory, vcpus, disk, group } }) => (
  <Card transparent>
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
  </Card>
);

export default Package;
