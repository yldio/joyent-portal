import React, { Fragment } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { Field } from 'redux-form';

import {
  P,
  H3,
  Input,
  Small,
  Button,
  FormGroup,
  FormLabel,
  PublicIcon,
  PrivateIcon
} from 'joyent-ui-toolkit';

const SmallBordered = styled(Small)`
  padding-right: ${remcalc(12)};
  margin-right: ${remcalc(12)};
  border-right: ${remcalc(1)} solid ${props => props.theme.grey};
`;

export const Header = () => (
  <Fragment>
    <H3>Hostnames</H3>
    <Padding bottom={2}>
      <P>
        Default hostnames are automatically generated from both the instance
        name and any attached networks.
      </P>
    </Padding>
  </Fragment>
);

export const HostnamesHeader = () => (
  <Margin top={4}>
    <H3>CNS service hostnames</H3>
    <Padding bottom={3}>
      <P>
        CNS service hostnames are created by attaching a CNS service name to one
        or more instances. You can serve multiple instances under the same
        hostname by assigning them to a matching CNS service name.
      </P>
    </Padding>
  </Margin>
);

export const AddServiceForm = ({ handleSubmit, pristine }) => (
  <form onSubmit={handleSubmit}>
    <Flex alignEnd>
      <FormGroup name="name" field={Field}>
        <FormLabel>Attach to new CNS service name</FormLabel>
        <Input onBlur={null} type="text" placeholder="Example: mySQLdb" />
      </FormGroup>
      <Margin left={2}>
        <Button type="submit" disabled={pristine}>
          Add
        </Button>
      </Margin>
    </Flex>
  </form>
);

export const Hostname = ({ values = [], network, service, ...hostname }) => (
  <Fragment>
    {values.length ? (
      <Margin bottom={4}>
        <Flex>
          <SmallBordered bold noMargin>
            {network && service
              ? 'Network CNS service'
              : network
                ? 'Network'
                : service ? 'CNS service' : 'Instance name'}{' '}
            hostname{values.length === 1 ? '' : 's'}
          </SmallBordered>
          <FlexItem>
            <Margin right={1}>
              {hostname.public ? <PublicIcon /> : <PrivateIcon />}
            </Margin>
          </FlexItem>
          <FlexItem>
            <Small noMargin>{hostname.public ? 'Public' : 'Private'}</Small>
          </FlexItem>
        </Flex>
        {values.map(value => (
          <Input onBlur={null} disabled monospace fluid value={value} />
        ))}
      </Margin>
    ) : null}
  </Fragment>
);
