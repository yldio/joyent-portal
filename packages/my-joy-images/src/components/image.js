import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Field } from 'redux-form';
import Flex from 'styled-flex-component';
import { Padding, Margin } from 'styled-components-spacing';

import {
  Card,
  Anchor,
  CardHeader,
  Divider,
  ActionsIcon,
  PopoverTarget,
  Popover,
  PopoverItem,
  PopoverDivider,
  PopoverContainer,
  Radio,
  FormLabel,
  FormGroup,
  StatusLoader
} from 'joyent-ui-toolkit';

import { ImageType, OS } from '@root/constants';

const A = styled(Anchor)`
  color: ${props => props.theme.text};
  text-decoration: none;
  font-weight: ${props => props.theme.font.weight.semibold};
`;

const CardAnchor = styled(Anchor)`
  color: ${props => props.theme.text};
  text-decoration: none;
`;

const ItemAnchor = styled(Anchor)`
  color: ${props => props.theme.text};
  -webkit-text-fill-color: currentcolor;
  text-decoration: none;
`;

const Type = styled(Margin)`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Content = styled(Padding)`
  max-width: calc(100% - 48px);
  overflow: hidden;
`;

const Max = styled(Flex)`
  max-width: 100%;
  height: 100%;
`;

const DividerContainer = styled(Margin)`
  height: 100%;
`;

const Actions = styled(Flex)`
  width: 48px;
  height: 48px;
  min-width: 48px;
`;

export const Image = ({
  name,
  os,
  version,
  type,
  removing,
  onRemove,
  onCreateInstance
}) => (
  <Margin bottom={3}>
    <CardAnchor to={`/${name}`} component={Link}>
      <Card radius>
        {removing ? (
          <Padding all={2}>
            <StatusLoader />
          </Padding>
        ) : (
          <Fragment>
            <CardHeader white radius>
              <Padding left={2} right={2}>
                <Flex full alignCenter>
                  <Margin right={2}>
                    {React.createElement(OS[os], {
                      width: '24',
                      height: '24'
                    })}
                  </Margin>
                  <A to={`/${name}/summary`} component={Link}>
                    {name}
                  </A>
                </Flex>
              </Padding>
            </CardHeader>
            <Flex justifyBetween>
              <Content left={2} top={2} bottom={2}>
                <Max justifyBetween>
                  <Max alignCenter>
                    <Flex>{version}</Flex>
                    <DividerContainer left={2}>
                      <Divider width={remcalc(1)} height="100%" />
                    </DividerContainer>
                    <Type left={2}>{ImageType[type]}</Type>
                  </Max>
                </Max>
              </Content>
              <PopoverContainer clickable>
                <Actions>
                  <PopoverTarget
                    box
                    style={{ borderLeft: '1px solid #D8D8D8' }}
                  >
                    <ActionsIcon />
                  </PopoverTarget>
                  <Popover placement="bottom">
                    <PopoverItem disabled={false} onClick={onCreateInstance}>
                      <ItemAnchor
                        href={`http://localhost:3069/~create/?image=${name}`}
                        target="__blank"
                        rel="noopener noreferrer"
                      >
                        Create Instance
                      </ItemAnchor>
                    </PopoverItem>
                    <PopoverDivider />
                    <PopoverItem disabled={removing} onClick={onRemove}>
                      Remove
                    </PopoverItem>
                  </Popover>
                </Actions>
              </PopoverContainer>
            </Flex>
          </Fragment>
        )}
      </Card>
    </CardAnchor>
  </Margin>
);

export const Filters = ({ selected }) => (
  <Fragment>
    <FormGroup name="image-type" value="all" field={Field} type="radio">
      <Radio noMargin>
        <Flex alignCenter>
          <Margin right={2}>
            <FormLabel big normal={selected !== 'all'}>
              All
            </FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
    <FormGroup
      name="image-type"
      value="hardware-virtual-machine"
      field={Field}
      type="radio"
    >
      <Radio noMargin>
        <Flex alignCenter>
          <Margin right={2}>
            <FormLabel big normal={selected !== 'hardware-virtual-machine'}>
              Virtual machines
            </FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
    <FormGroup
      name="image-type"
      value="infrastructure-container"
      field={Field}
      type="radio"
    >
      <Radio noMargin>
        <Flex alignCenter>
          <Margin right={2}>
            <FormLabel big normal={selected !== 'infrastructure-container'}>
              Infrastructure container
            </FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
  </Fragment>
);
