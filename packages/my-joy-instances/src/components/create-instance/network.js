/* eslint-disable camelcase */
import React from 'react';
import { Field } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled from 'styled-components';
import Flex, { FlexItem } from 'styled-flex-component';
import remcalc from 'remcalc';

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
  </Margin>
);

export const Expanded = ({
  id,
  name,
  fabric,
  subnet,
  description,
  provision_start_ip,
  provision_end_ip,
  selected = false,
  infoExpanded = false,
  onInfoClick,
  ...network
}) => (
  <Row>
    <Col xs={12} sm={8}>
      <Margin bottom={4}>
        <Card shadow>
          <CardHeader secondary={selected}>
            <CardHeaderBox>
              <FormGroup name={id} field={Field}>
                <Checkbox noMargin checked={selected} />
              </FormGroup>
            </CardHeaderBox>
            <CardHeaderMeta paddingLeft={0}>
              <H4 white={selected}>{name}</H4>
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
              </Flex>
              {fabric ? (
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
                                    <DotIcon
                                      right={remcalc(6)}
                                      size={remcalc(12)}
                                      color="green"
                                    />
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
                                <Margin top={0.5} bottom={2}>
                                  <Input
                                    onBlur={null}
                                    big
                                    monospace
                                    type="text"
                                    value={id}
                                  />
                                </Margin>
                              </FormGroup>
                            </FlexItem>
                            <FlexItem>
                              <FormGroup name="subnet">
                                <FormLabel>Subnet</FormLabel>
                                <Margin top={0.5} bottom={2}>
                                  <Input
                                    onBlur={null}
                                    big
                                    monospace
                                    type="text"
                                    value={subnet}
                                  />
                                </Margin>
                              </FormGroup>
                            </FlexItem>
                            <FlexItem>
                              <FormGroup name="ip-range">
                                <FormLabel>IP range</FormLabel>
                                <Margin top={0.5}>
                                  <Input
                                    onBlur={null}
                                    big
                                    monospace
                                    type="text"
                                    value={`${provision_start_ip} - ${provision_end_ip}`}
                                  />
                                </Margin>
                              </FormGroup>
                            </FlexItem>
                          </Flex>
                        </Padding>
                      </CardOutlet>
                    ) : null}
                  </Card>
                </Margin>
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