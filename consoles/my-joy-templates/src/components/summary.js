import React, { Fragment, PureComponent } from 'react';
import { If, Then, Else } from 'react-if';
import ReduxForm from 'declarative-redux-form';
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
  CnsIcon
} from 'joyent-ui-toolkit';

import Editor from 'joyent-ui-toolkit/dist/es/editor';
import { FirewallPreview, CnsPreview } from 'joyent-ui-instance-steps';
import { KeyValue } from 'joyent-ui-resource-widgets';
import { Forms } from '@root/constants';

const { TS_M_F } = Forms;

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

export const Meta = ({
  actions = true,
  removing = false,
  onRemove,
  id,
  name,
  created,
  image,
  ...template
}) => (
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
        <If condition={actions}>
          <Then>
            <Fragment>
              <Margin top="3" bottom="3">
                <Hr />
              </Margin>
              <Row between="xs">
                <Col xs="6">
                  <Margin right="1" inline>
                    <Button
                      type="button"
                      to={`/service-groups/~create/name?template=${id}`}
                      component={Link}
                      bold
                      icon
                    >
                      <span>Create Service Group</span>
                    </Button>
                  </Margin>
                  <Button
                    type="button"
                    to={`/templates/~duplicate/${id}/name`}
                    component={Link}
                    secondary
                    bold
                    icon
                  >
                    <span>Duplicate</span>
                  </Button>
                </Col>
                <Col xs="6">
                  <Button
                    type="button"
                    onClick={onRemove}
                    loading={removing}
                    secondary
                    bold
                    right
                    icon
                    error
                  >
                    <Margin right="2">
                      <DeleteIcon fill="red" />
                    </Margin>
                    <span>Remove</span>
                  </Button>
                </Col>
              </Row>
            </Fragment>
          </Then>
        </If>
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
        <Margin left="3" right="3" top="2" bottom="2">
          <P>{name}</P>
        </Margin>
      </FlexItem>
      <FlexItem>
        <Line left="0" right="0" />
      </FlexItem>
      <FlexItem>
        <Margin left="3" right="3" top="2" bottom="2">
          <Flex>
            <Margin right="4">
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>
                    <Margin right="1">
                      <If condition={network.public}>
                        <Then>
                          <PublicIcon />
                        </Then>
                        <Else>
                          <PrivateIcon />
                        </Else>
                      </If>
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <P>
                      <If condition={network.public}>
                        <Then>
                          <Fragment>Public</Fragment>
                        </Then>
                        <Else>
                          <Fragment>Private</Fragment>
                        </Else>
                      </If>
                    </P>
                  </FlexItem>
                </Flex>
              </FlexItem>
            </Margin>
            <Margin>
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>
                    <Margin right="1">
                      <If condition={fabric}>
                        <Then>
                          <FabricIcon />
                        </Then>
                        <Else>
                          <DataCenterIcon />
                        </Else>
                      </If>
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <P>
                      <If condition={fabric}>
                        <Then>
                          <Fragment>Fabric network</Fragment>
                        </Then>
                        <Else>
                          <Fragment>Data center network</Fragment>
                        </Else>
                      </If>
                    </P>
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

const Tags = ({ values }) =>
  values.length ? (
    <Item icon={<TagsIcon disabled />} label="Tags">
      <Margin bottom="-1">
        {values.map(({ name, value }) => (
          <Margin right="1" bottom="1" inline>
            <TagItem>
              {name}:{value}
            </TagItem>
          </Margin>
        ))}
      </Margin>
    </Item>
  ) : null;

class MetadataItem extends PureComponent {
  state = {
    expanded: false
  };

  handleToggleExpanded = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  render() {
    return (
      <ReduxForm form={TS_M_F(this.props.name)} initialValues={this.props}>
        {props => (
          <KeyValue
            {...props}
            method="edit"
            input="textarea"
            expanded={this.state.expanded}
            shadow={false}
            onToggleExpanded={this.handleToggleExpanded}
            disabled
            noActions
          />
        )}
      </ReduxForm>
    );
  }
}

const Metadata = ({ values = [] }) =>
  values.length ? (
    <Item icon={<MetadataIcon disabled />} label="Metadata">
      {values.map(({ name, value }, i) => (
        <Margin bottom={values.length === i + 1 ? '0' : '2'}>
          <MetadataItem name={name} value={value} />
        </Margin>
      ))}
    </Item>
  ) : null;

const UserScript = ({ value = '' }) =>
  value.length ? (
    <Item icon={<ScriptIcon disabled />} label="User script">
      <Margin bottom="3">
        <H3>{value.trim().split(/\n/).length} lines of code</H3>
      </Margin>
      <Editor value={value} onBlur={null} mode="sh" />
    </Item>
  ) : null;

const Firewall = ({ enabled = false }) => (
  <Item icon={<FirewallIcon disabled />} label="Firewall rules">
    <FirewallPreview enabled={enabled} />
  </Item>
);

const Cns = ({ enabled = false }) => (
  <Item icon={<CnsIcon disabled />} label="CNS">
    <CnsPreview enabled={enabled} />
  </Item>
);

export const Template = ({
  tags = [],
  metadata = [],
  userScript = '',
  enableFirewall = false,
  cnsEnabled = false
}) => (
  <Card>
    <CardOutlet>
      <Padding all="5">
        <H2>Template details</H2>
        <Image name="centos-7/20170327" type="Hardware virtual machine" />
        <Package name="k4–high–cpu–47" />
        <Networks />
        <Tags values={tags} />
        <Metadata values={metadata} />
        <UserScript value={userScript} />
        <Firewall enabled={enableFirewall} />
        <Cns enabled={cnsEnabled} />
      </Padding>
    </CardOutlet>
  </Card>
);
