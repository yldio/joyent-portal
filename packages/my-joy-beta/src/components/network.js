import React, { Fragment } from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';

import {
  H4,
  P,
  Small,
  DotIcon,
  Card,
  CardHeader,
  CardHeaderMeta,
  CardHeaderBox,
  CardOutlet,
  FormGroup,
  FormLabel,
  Input,
  Checkbox,
  Divider,
  FabricIcon,
  InstanceCountIcon,
  DataCenterIcon,
  PublicIcon,
  PrivateIcon,
  ArrowIcon
} from 'joyent-ui-toolkit';

const Box = styled.div`
  display: inline-block;
  background-color: ${props => props.theme.white};
  border: ${remcalc(1)} solid ${props => props.theme.grey};
  border-radius: ${remcalc(4)};
  min-width: ${remcalc(300)};
`;

export const Collapsed = ({ name, fabric, ...network }) => (
  <Row>
    <Col xs={12} sm={8}>
      <Margin inline right={3} top={3}>
        <Box>
          <Flex column>
            <FlexItem>
              <Margin left={3} right={3} top={2} bottom={2}>
                <P>{name}</P>
              </Margin>
            </FlexItem>
            <FlexItem>
              <Divider height={remcalc(1)} />
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
                          <P>
                            {fabric ? 'Fabric network' : 'Data center network'}
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
      </Margin>
    </Col>
  </Row>
);

export const Expanded = ({
  id,
  name,
  fabric,
  subnet,
  description,
  machines = [],
  provision_start_ip,
  provision_end_ip,
  selected = false,
  infoExpanded = false,
  machinesExpanded = false,
  readOnly = false,
  onInfoClick,
  onMachinesClick,
  ...network
}) => (
  <Row>
    <Col xs={12} sm={8}>
      <Margin bottom={4}>
        <Card shadow>
          <CardHeader secondary={selected}>
            {!readOnly ? (
              <CardHeaderBox>
                <FormGroup name={id} field={Field}>
                  <Checkbox noMargin checked={selected} />
                </FormGroup>
              </CardHeaderBox>
            ) : null}
            <CardHeaderMeta>
              <Padding left={readOnly ? 3 : 0} right={readOnly ? 3 : 0}>
                <H4 white={selected}>{name}</H4>
              </Padding>
            </CardHeaderMeta>
          </CardHeader>
          <CardOutlet>
            <Padding all={4}>
              {description && (
                <Margin bottom={3}>
                  <P>{description}</P>
                </Margin>
              )}
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
                <Margin right={4}>
                  <FlexItem>
                    <Flex alignCenter>
                      <FlexItem>
                        <Margin right={1}>
                          {fabric ? <FabricIcon /> : <DataCenterIcon />}
                        </Margin>
                      </FlexItem>
                      <FlexItem>
                        <P>
                          {fabric ? 'Fabric network' : 'Data center network'}
                        </P>
                      </FlexItem>
                    </Flex>
                  </FlexItem>
                </Margin>
                {fabric ? (
                  <Margin right={4}>
                    <FlexItem>
                      <Flex alignCenter>
                        <FlexItem>
                          <Margin right={1}>
                            <InstanceCountIcon />
                          </Margin>
                        </FlexItem>
                        <FlexItem>
                          <P>
                            {`${machines.length} instance${
                              machines.length === 1 ? '' : 's'
                            }`}
                          </P>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </Margin>
                ) : null}
              </Flex>
              {fabric ? (
                <Fragment>
                  <Margin top={3}>
                    <Card collapsed={!infoExpanded} actionable={!infoExpanded}>
                      <CardHeader
                        secondary={false}
                        transparent={false}
                        onClick={onInfoClick}
                      >
                        <CardHeaderMeta>
                          <Padding left={3} right={3}>
                            <P>Network information</P>
                          </Padding>
                        </CardHeaderMeta>
                        <CardHeaderBox>
                          <ArrowIcon direction={infoExpanded ? 'up' : 'down'} />
                        </CardHeaderBox>
                      </CardHeader>
                      {infoExpanded ? (
                        <CardOutlet>
                          <Padding all={3}>
                            <Flex column>
                              {network.internet_nat ? (
                                <FlexItem>
                                  <Margin bottom={3}>
                                    <Flex alignCenter>
                                      <Margin right={1}>
                                        <DotIcon
                                          width={remcalc(12)}
                                          height={remcalc(12)}
                                          color="green"
                                        />
                                      </Margin>
                                      <Small bold noMargin>
                                        Outbound internet access enabled
                                      </Small>
                                    </Flex>
                                  </Margin>
                                </FlexItem>
                              ) : null}
                              <FlexItem>
                                <FormGroup name="id">
                                  <FormLabel>ID</FormLabel>
                                  <Input
                                    onBlur={null}
                                    big
                                    monospace
                                    type="text"
                                    value={id}
                                  />
                                </FormGroup>
                              </FlexItem>
                              <FlexItem>
                                <FormGroup name="subnet">
                                  <FormLabel>Subnet</FormLabel>
                                  <Input
                                    onBlur={null}
                                    big
                                    monospace
                                    type="text"
                                    value={subnet}
                                  />
                                </FormGroup>
                              </FlexItem>
                              <FlexItem>
                                <FormGroup name="ip-range">
                                  <FormLabel>IP range</FormLabel>
                                  <Input
                                    onBlur={null}
                                    big
                                    monospace
                                    type="text"
                                    value={`${provision_start_ip} - ${provision_end_ip}`}
                                  />
                                </FormGroup>
                              </FlexItem>
                            </Flex>
                          </Padding>
                        </CardOutlet>
                      ) : null}
                    </Card>
                  </Margin>
                  <Margin top={3}>
                    <Card
                      collapsed={!machinesExpanded}
                      actionable={!machinesExpanded}
                    >
                      <CardHeader
                        secondary={false}
                        transparent={false}
                        onClick={onMachinesClick}
                      >
                        <CardHeaderMeta>
                          <Padding left={3} right={3}>
                            <P>Instances on network</P>
                          </Padding>
                        </CardHeaderMeta>
                        <CardHeaderBox>
                          <ArrowIcon
                            direction={machinesExpanded ? 'up' : 'down'}
                          />
                        </CardHeaderBox>
                      </CardHeader>
                      {machinesExpanded ? (
                        <CardOutlet>
                          <Padding all={3}>
                            <Flex column>
                              {machines.map(({ name }) => (
                                <FlexItem>
                                  <P>{name}</P>
                                </FlexItem>
                              ))}
                            </Flex>
                          </Padding>
                        </CardOutlet>
                      ) : null}
                    </Card>
                  </Margin>
                </Fragment>
              ) : null}
            </Padding>
          </CardOutlet>
        </Card>
      </Margin>
    </Col>
  </Row>
);

export default ({ small = false, ...rest }) =>
  small ? <Collapsed {...rest} /> : <Expanded {...rest} />;
