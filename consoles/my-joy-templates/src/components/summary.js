import React from 'react';
import { Link } from 'react-router-dom';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Padding, Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';

import {
  Card,
  CardOutlet,
  H2,
  H3,
  H4,
  P,
  Label,
  Button,
  Hr,
  TagItem,
  DeleteIcon,
  InstanceTypeIcon,
  PackageIcon,
  PublicIcon,
  PrivateIcon,
  FabricIcon,
  DataCenterIcon,
  NetworkIcon,
  TagsIcon,
  MetadataIcon,
  ScriptIcon,
  FirewallIcon,
  CnsIcon,
  AffinityIcon
} from 'joyent-ui-toolkit';

const GreyLabel = styled(Label)`
  opacity: 0.5;
  padding-right: ${remcalc(3)};
`;

const Line = styled(Hr)`
  ${is('left')`
    margin-left: ${props => props.left};
  `};

  ${is('right')`
    margin-right: ${props => props.right};
  `};
`;

const VerticalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0;
`;

const Box = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  border-radius: ${remcalc(4)};
  min-width: ${remcalc(300)};
`;

const Item = ({ icon, label, children }) => (
  <Margin top="5">
    <Flex alignCenter>
      <FlexItem>
        <Padding right="3">{icon}</Padding>
      </FlexItem>
      <VerticalDivider />
      <FlexItem>
        <Padding left="3">
          <GreyLabel inline>{label}</GreyLabel>
        </Padding>
      </FlexItem>
      <FlexItem grow="2">
        <Padding left="2">
          <Line left="0" />
        </Padding>
      </FlexItem>
    </Flex>
    <Margin top="3">{children}</Margin>
  </Margin>
);

export const Meta = ({ id, name, created, image, ...template }) => (
  <Card>
    <CardOutlet>
      <Padding all="5">
        <Margin bottom="2">
          <H2>{name}</H2>
        </Margin>
        <Flex>
          <FlexItem>
            <Padding right="3">
              <GreyLabel inline>Image: </GreyLabel>
              <Label inline> {image}</Label>
            </Padding>
          </FlexItem>
          <VerticalDivider />
          <FlexItem>
            <Padding right="3" left="3">
              <GreyLabel inline>Package: </GreyLabel>
              <Label inline> {template.package}</Label>
            </Padding>
          </FlexItem>
          <VerticalDivider />
          <FlexItem>
            <Padding horizontal="3">
              <GreyLabel inline>Created: </GreyLabel>
              <Label inline> {distanceInWordsToNow(created)} ago</Label>
            </Padding>
          </FlexItem>
        </Flex>
        <Margin top="3" bottom="3">
          <Hr />
        </Margin>
        <Row between="xs">
          <Col xs="6">
            <Margin right="1" inline>
              <Button
                type="button"
                to={`/service-groups/~create?template=${id}`}
                component={Link}
                bold
                icon
              >
                <span>Create Service Group</span>
              </Button>
            </Margin>
            <Button type="button" secondary bold icon>
              <span>Duplicate</span>
            </Button>
          </Col>
          <Col xs="6">
            <Button type="button" secondary bold right icon error>
              <Margin right={2}>
                <DeleteIcon fill="red" />
              </Margin>
              <span>Remove</span>
            </Button>
          </Col>
        </Row>
      </Padding>
    </CardOutlet>
  </Card>
);

const Image = ({ name, type }) => (
  <Item icon={<InstanceTypeIcon disabled />} label="Image">
    <Margin bottom="2">
      <H3>{name}</H3>
    </Margin>
    <H4>{type}</H4>
  </Item>
);

const Package = ({ name }) => (
  <Item icon={<PackageIcon disabled />} label="Package">
    <Margin bottom="2">
      <H3>{name}</H3>
    </Margin>
    <Flex alignCenter>
      <FlexItem>
        <Padding right="3">
          <Label inline>$0.416 per hour</Label>
        </Padding>
      </FlexItem>
      <VerticalDivider />
      <FlexItem>
        <Padding right="3" left="3">
          <Label inline>32 GB RAM</Label>
        </Padding>
      </FlexItem>
      <VerticalDivider />
      <FlexItem>
        <Padding right="3" left="3">
          <Label inline>4 vCPUs</Label>
        </Padding>
      </FlexItem>
      <VerticalDivider />
      <FlexItem>
        <Padding right="3" left="3">
          <Label inline>200 GB disk</Label>
        </Padding>
      </FlexItem>
      <VerticalDivider />
      <FlexItem>
        <Padding right="3" left="3">
          <Label inline>SSD</Label>
        </Padding>
      </FlexItem>
    </Flex>
  </Item>
);

const Network = ({ name, fabric, ...network }) => (
  <Box>
    <Flex column>
      <FlexItem>
        <Margin left={3} right={3} top={2} bottom={2}>
          <P>{name}</P>
        </Margin>
      </FlexItem>
      <FlexItem>
        <Line left="0" right="0" />
      </FlexItem>
      <FlexItem>
        <Margin left={3} right={3} top={2} bottom={2}>
          <Flex>
            <Margin right={4}>
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>
                    <Margin right={1}>
                      {network.public ? <PublicIcon /> : <PrivateIcon />}
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <P>{network.public ? 'Public' : 'Private'}</P>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Margin>
            <Margin>
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>
                    <Margin right={1}>
                      {fabric ? <FabricIcon /> : <DataCenterIcon />}
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <P>{fabric ? 'Fabric network' : 'Data center network'}</P>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Margin>
          </Flex>
        </Margin>
      </FlexItem>
    </Flex>
  </Box>
);

const Networks = () => (
  <Item icon={<NetworkIcon disabled />} label="Networks">
    <Margin right="3" inline>
      <Network name="Joyent -SDC-Public-Network" />
    </Margin>
    <Margin right="3" inline>
      <Network name="My-Amazing-Network" />
    </Margin>
  </Item>
);

const Tags = () => (
  <Item icon={<TagsIcon disabled />} label="Tags">
    <Margin bottom="-1">
      <Margin right="1" bottom="1" inline>
        <TagItem>type:db</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:database</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:data</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:base</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:db</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:database</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:data</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:base</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:db</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:database</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:data</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:base</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:db</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:database</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:data</TagItem>
      </Margin>
      <Margin right="1" bottom="1" inline>
        <TagItem>type:base</TagItem>
      </Margin>
    </Margin>
  </Item>
);

const Metadata = () => (
  <Item icon={<MetadataIcon disabled />} label="Metadata" />
);

const UserScript = () => (
  <Item icon={<ScriptIcon disabled />} label="User script" />
);

const Firewall = () => (
  <Item icon={<FirewallIcon disabled />} label="Firewall rules" />
);

const Cns = () => <Item icon={<CnsIcon disabled />} label="CNS" />;

const Affinity = () => (
  <Item icon={<AffinityIcon disabled />} label="Affinity rules" />
);

export const Template = () => (
  <Card>
    <CardOutlet>
      <Padding all="5">
        <H2>Template details</H2>
        <Image name="centos-7/20170327" type="Hardware virtual machine" />
        <Package name="k4–high–cpu–47" />
        <Networks />
        <Tags />
        <Metadata />
        <UserScript />
        <Firewall />
        <Cns />
        <Affinity />
      </Padding>
    </CardOutlet>
  </Card>
);
