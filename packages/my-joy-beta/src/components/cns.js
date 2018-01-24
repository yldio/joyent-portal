import React, { Fragment } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { Field } from 'redux-form';

import {
  P,
  H3,
  Card,
  Divider,
  TagList,
  Input,
  Toggle,
  Small,
  Button,
  FormGroup,
  FormLabel,
  PublicIcon,
  PrivateIcon
} from 'joyent-ui-toolkit';

import Tag from '@components/tags';

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

export const Footer = ({ enabled, submitting, onToggle }) => (
  <Fragment>
    <Margin bottom={4} top={4}>
      <FormGroup name="cns-enabled">
        <Flex alignCenter>
          <FormLabel>Disabled CNS</FormLabel>
          <Toggle checked={enabled} onChange={onToggle} disabled={submitting}>
            Enabled CNS
          </Toggle>
        </Flex>
      </FormGroup>
    </Margin>
    {enabled ? (
      <Margin bottom={4}>
        <P>*All hostnames listed here will be confirmed after deployment.</P>
      </Margin>
    ) : null}
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

export const AddServiceForm = ({
  handleSubmit,
  submitting,
  disabled,
  pristine
}) => (
  <form onSubmit={handleSubmit}>
    <Flex alignEnd>
      <FormGroup name="name" field={Field}>
        <FormLabel>Attach to new CNS service name</FormLabel>
        <Input
          onBlur={null}
          type="text"
          placeholder="Example: mySQLdb"
          disabled={disabled || submitting}
        />
      </FormGroup>
      <Margin left={2}>
        <Button
          type="submit"
          disabled={disabled || pristine}
          loading={submitting}
        >
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

const DefaultHostnames = ({ hostnames }) => (
  <Fragment>
    <Header />
    <Flex column>
      {hostnames.map(({ value, ...hostname }) => (
        <Hostname key={value} value={value} {...hostname} />
      ))}
    </Flex>
  </Fragment>
);

const CnsHostnames = ({
  hostnames = [],
  services = [],
  onRemoveService = () => null,
  children = null
}) => (
  <Fragment>
    <HostnamesHeader />
    {services.length ? (
      <Margin bottom={3}>
        <FormLabel>Existing CNS service name(s)</FormLabel>
        <Margin top={1}>
          <TagList>
            {services.map(value => (
              <Tag
                active
                key={value}
                value={value}
                onRemoveClick={
                  onRemoveService && (() => onRemoveService(value))
                }
              />
            ))}
          </TagList>
        </Margin>
      </Margin>
    ) : null}
    {children}
    <Margin top={4}>
      <Flex column>
        {hostnames.map(({ value, ...hostname }) => (
          <Hostname key={value} value={value} {...hostname} />
        ))}
      </Flex>
    </Margin>
  </Fragment>
);

export default ({
  hostnames = [],
  services = [],
  onRemoveService,
  children = null
}) => (
  <Card>
    <Padding all={4} bottom={0}>
      <DefaultHostnames
        hostnames={hostnames.filter(({ service }) => !service)}
      />
      <Divider height={remcalc(1)} />
      <Margin top={4}>
        <CnsHostnames
          services={services}
          hostnames={hostnames.filter(({ service }) => service)}
          onRemoveService={onRemoveService}
        >
          {children}
        </CnsHostnames>
      </Margin>
    </Padding>
  </Card>
);
