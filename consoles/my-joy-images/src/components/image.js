import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Field } from 'redux-form';
import Flex, { FlexItem } from 'styled-flex-component';
import { Padding, Margin } from 'styled-components-spacing';
import remcalc from 'remcalc';

import {
  Card,
  Anchor,
  CardHeader,
  Divider,
  ActionsIcon,
  PopoverTarget,
  Popover,
  PopoverItem,
  PopoverDivider as BasePopoverDivider,
  PopoverContainer,
  Radio,
  FormLabel,
  FormGroup,
  StatusLoader
} from 'joyent-ui-toolkit';

import GLOBAL from '@state/global';
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
  max-width: calc(100% - ${remcalc(48)});
  overflow: hidden;
`;

const Max = styled(Flex)`
  max-width: 100%;
`;

const Actions = styled(Flex)`
  width: ${remcalc(48)};
  height: ${remcalc(48)};
  min-width: ${remcalc(48)};
`;

const ActionsWrapper = styled(Flex)`
  height: 100%;
  width: 100%;
  border-left: ${remcalc(1)} solid ${props => props.theme.grey};
`;

const PopoverDivider = styled(BasePopoverDivider)`
  width: 100%;
`;

export const Image = ({
  name,
  id,
  os,
  version,
  type,
  removing,
  onRemove,
  onCreateInstance
}) => (
  <Margin bottom="3">
    <CardAnchor to={`/images/${id}`} component={Link}>
      <Card radius>
        {removing ? (
          <Padding all="2">
            <StatusLoader />
          </Padding>
        ) : (
          <Fragment>
            <CardHeader white radius>
              <Padding left="2" right="2">
                <Flex full alignCenter>
                  <FlexItem>
                    <Margin right="2">
                      {React.createElement(OS[os], {
                        width: '24',
                        height: '24'
                      })}
                    </Margin>
                  </FlexItem>
                  <FlexItem>
                    <A to={`/images/${id}/summary`} component={Link}>
                      {name}
                    </A>
                  </FlexItem>
                </Flex>
              </Padding>
            </CardHeader>
            <Flex justifyBetween>
              <Content left="2" top="2" bottom="2">
                <Max justifyBetween>
                  <Max alignCenter>
                    <Flex>{version}</Flex>
                    <Divider vertical />
                    <Type>{ImageType[type]}</Type>
                  </Max>
                </Max>
              </Content>
              <PopoverContainer clickable>
                <Actions>
                  <PopoverTarget box>
                    <ActionsWrapper alignCenter justifyCenter>
                      <ActionsIcon />
                    </ActionsWrapper>
                  </PopoverTarget>
                  <Popover noPadding placement="bottom">
                    <Padding horizontal="3" vertical="2">
                      <PopoverItem disabled={false} onClick={onCreateInstance}>
                        <ItemAnchor
                          href={`${
                            GLOBAL.origin
                          }/instances/~create/?image=${name}`}
                          target="__blank"
                          rel="noopener noreferrer"
                        >
                          Create Instance
                        </ItemAnchor>
                      </PopoverItem>
                    </Padding>
                    <PopoverDivider />
                    <Padding horizontal="3" vertical="2">
                      <PopoverItem disabled={removing} onClick={onRemove}>
                        Remove
                      </PopoverItem>
                    </Padding>
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
      <Radio>
        <Flex alignCenter>
          <Margin horizontal="2">
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
          <Margin horizontal="2">
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
          <Margin horizontal="2">
            <FormLabel big normal={selected !== 'infrastructure-container'}>
              Infrastructure container
            </FormLabel>
          </Margin>
        </Flex>
      </Radio>
    </FormGroup>
  </Fragment>
);
