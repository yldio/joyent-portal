import React, { Fragment } from 'react';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Margin } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import { Field } from 'redux-form';

import {
  P as BaseP,
  H3 as BaseH3,
  Divider,
  TagList,
  Input,
  Toggle as BaseToggle,
  Small,
  Button,
  FormGroup,
  FormLabel,
  PublicIcon,
  PrivateIcon,
  CopiableField,
  FormMeta,
  TagItem
} from 'joyent-ui-toolkit';

const SmallBordered = styled(Small)`
  padding-right: ${remcalc(12)};
  margin-right: ${remcalc(12)};
  border-right: ${remcalc(1)} solid ${props => props.theme.grey};
`;

const H3 = styled(BaseH3)`
  margin: 0;
`;

const P = styled(BaseP)`
  margin: 0;
`;

const Toggle = styled(BaseToggle)`
  margin: 0 6px;
`;

const ShortDivider = styled(Divider)`
  margin-left: 0;
  margin-right: 0;
`;

export const Header = () => (
  <Margin bottom={5}>
    <H3>CNS Default Hostnames</H3>
    <Margin top={2}>
      <P>
        Default hostnames are automatically generated from both the instance
        name and any attached networks.
      </P>
    </Margin>
  </Margin>
);

export const Footer = ({ enabled, submitting, onToggle }) => (
  <Fragment>
    <Margin bottom={3}>
      <FormGroup name="cns-enabled">
        <Flex alignCenter>
          <FormLabel disabled={submitting}>Disabled CNS</FormLabel>
          <Margin left={1}>
            <Toggle checked={enabled} onChange={onToggle} disabled={submitting}>
              Enabled CNS
            </Toggle>
          </Margin>
        </Flex>
      </FormGroup>
    </Margin>
  </Fragment>
);

export const HostnamesHeader = () => (
  <Margin vertical={5}>
    <H3>CNS Service hostnames</H3>
    <Margin top={2}>
      <P>
        CNS service hostnames are created by attaching a CNS service name to one
        or more instances. You can serve multiple instances under the same
        hostname by assigning them to a matching CNS service name.
      </P>
    </Margin>
  </Margin>
);

export const AddServiceForm = ({
  handleSubmit,
  submitting,
  disabled,
  pristine,
  invalid
}) => (
  <form onSubmit={handleSubmit}>
    <Flex wrap alignCenter={invalid} alignEnd={!invalid}>
      <FlexItem>
        <Flex collumn>
          <FormGroup name="name" field={Field}>
            <FormLabel>Attach to new CNS service name</FormLabel>
            <Margin top={0.5}>
              <Input
                onBlur={null}
                type="text"
                placeholder="Example: mySQLdb"
                disabled={disabled || submitting}
              />
              <FormMeta />
            </Margin>
          </FormGroup>
        </Flex>
      </FlexItem>
      <FlexItem>
        <Margin left={2}>
          <Button
            type="submit"
            disabled={submitting}
            loading={submitting}
            inline
          >
            Add
          </Button>
        </Margin>
      </FlexItem>
    </Flex>
  </form>
);

export const Hostname = ({
  copy,
  values = [],
  network,
  service,
  noMargin,
  ...hostname
}) => (
  <Fragment>
    <Margin bottom={noMargin ? 0 : 3}>
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
          <Margin bottom={0.5} right={1}>
            {hostname.public ? <PublicIcon /> : <PrivateIcon />}
          </Margin>
        </FlexItem>
        <FlexItem>
          <Small noMargin>{hostname.public ? 'Public' : 'Private'}</Small>
        </FlexItem>
      </Flex>
      {values.map((value, i) => (
        <Margin
          top={0.5}
          bottom={
            values.length !== 1 && values.length !== i + 1 ? '1' : undefined
          }
        >
          {copy ? (
            <CopiableField disabled md={12} text={value} />
          ) : (
            <Input onBlur={null} disabled monospace fluid value={value} />
          )}
        </Margin>
      ))}
    </Margin>
  </Fragment>
);

const DefaultHostnames = ({ hostnames, copy }) => (
  <Fragment>
    <Header />
    <Flex column>
      {hostnames.map(({ value, ...hostname }) => (
        <Hostname copy={copy} key={value} value={value} {...hostname} />
      ))}
    </Flex>
  </Fragment>
);

const CnsHostnames = ({
  hostnames = [],
  services = [],
  onRemoveService = () => null,
  children = null,
  copy = false
}) => (
  <Fragment>
    <HostnamesHeader />
    {services.length ? (
      <Margin bottom={3}>
        <FormLabel>Existing CNS service name(s)</FormLabel>
        <Margin top={1}>
          <TagList>
            {services.map(value => (
              <TagItem
                active
                key={value}
                onRemoveClick={
                  onRemoveService && (() => onRemoveService(value))
                }
              >
                {value}
              </TagItem>
            ))}
          </TagList>
        </Margin>
      </Margin>
    ) : null}
    {children}
    {hostnames.length &&
    hostnames.filter(({ values }) => values.length).length ? (
      <Margin top={5}>
        <Flex column>
          {hostnames.map(({ value, ...hostname }, index) => (
            <Hostname
              copy={copy}
              key={value}
              value={value}
              noMargin={index === hostnames.length - 1}
              {...hostname}
            />
          ))}
        </Flex>
      </Margin>
    ) : null}
  </Fragment>
);

export default ({
  copy,
  hostnames = [],
  services = [],
  onRemoveService,
  children = null
}) => (
  <Fragment>
    <DefaultHostnames
      copy={copy}
      hostnames={hostnames.filter(({ service }) => !service)}
    />
    <Margin top={2}>
      <ShortDivider height={remcalc(1)} />
    </Margin>
    <Margin top={5}>
      <CnsHostnames
        copy={copy}
        services={services}
        hostnames={hostnames.filter(({ service }) => service)}
        onRemoveService={onRemoveService}
      >
        {children}
      </CnsHostnames>
    </Margin>
  </Fragment>
);
