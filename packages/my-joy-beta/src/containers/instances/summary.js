import React from 'react';
import titleCase from 'title-case';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';
import copy from 'clipboard-copy';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Margin } from 'styled-components-spacing';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import intercept from 'apr-intercept';
import {
  ViewContainer,
  Input,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle,
  FormLabel,
  Card,
  CardOutlet,
  CopyIcon,
  TooltipContainer,
  TooltipTarget,
  Tooltip,
  Divider,
  H2,
  DotIcon,
  Label,
  Button
} from 'joyent-ui-toolkit';

import GetInstance from '@graphql/get-instance.gql';
import StartInstance from '@graphql/start-instance.gql';
import StopInstance from '@graphql/stop-instance.gql';
import RebootInstance from '@graphql/reboot-instance.gql';
import DeleteInstance from '@graphql/delete-instance.gql';

const stateColor = {
  PROVISIONING: 'primary',
  RUNNING: 'green',
  STOPPING: 'grey',
  STOPPED: 'grey',
  DELETED: 'secondaryActive',
  FAILED: 'red'
};

const HorizontalDivider = styled.div`
  width: ${remcalc(1)};
  background: ${props => props.theme.grey};
  height: ${remcalc(24)};
  display: flex;
  align-self: flex-end;
  margin: 0 ${remcalc(18)};
  @media (max-width: 767px) {
    background: transparent;
    height: ${remcalc(12)};
  }
`;

const DotIconStyled = styled(DotIcon)`
  border-radius: 50%;
  margin-right: ${remcalc(6)};
  margin-top: ${remcalc(1)};
`;

const GreyLabel = styled(Label)`
  opacity: 0.5;
  padding-right: ${remcalc(3)};
`;

const CopyIconActionable = styled(CopyIcon)`
  cursor: pointer;
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 767px) {
    display: block;
  }
`;

const FlexEnd = styled.div`
  justify-content: flex-end;
  align-items: center;
  display: flex;
  flex-grow: 1;
`;

const InputIconWrapper = styled.div`
  display: flex;
  margin-bottom: ${remcalc(18)};
  align-items: center;

  input {
    padding-right: ${remcalc(30)};
  }

  div {
    position: relative;
    left: ${remcalc(-26)};
  }
`;

const copyToClipboard = text => (
  <TooltipContainer hoverable>
    <TooltipTarget>
      <CopyIconActionable onClick={() => copy(text)} />
    </TooltipTarget>
    <Tooltip placement="top">
      {/* {false ? 'Copied To Clipboard' : 'Copy To Clipboard'} */}
      Copy To Clipboard
    </Tooltip>
  </TooltipContainer>
)

const Summary = ({
  instance,
  loading,
  error,
  startInstance,
  handleInstance,
  starting,
  stopping,
  rebooting,
  deleteing,
  mutationError
}) => {
  const { name } = instance || {};

  const _loading = loading && !name && <StatusLoader />;
  const _summary = !_loading &&
    instance && [
      <Row>
        <Col md={9} xs={12}>
          <Card>
            <CardOutlet>
              <Row middle="xs">
                <Col xs={12}>
                  <H2>{instance.package.name}</H2>
                </Col>
              </Row>
              <Margin top={2} bottom={3}>
                <Flex>
                  <Label>
                    {instance.image
                      ? titleCase(instance.image.name)
                      : 'Custom Image'}
                  </Label>
                  <HorizontalDivider />
                  <Label>
                    {instance.docker
                      ? 'Infrastructure Container'
                      : 'Hardware Virtual Machine'}
                  </Label>
                  <HorizontalDivider />
                  <Flex>
                    <DotIconStyled
                      width={remcalc(11)}
                      height={remcalc(11)}
                      color={stateColor[instance.state]}
                    />
                    {titleCase(instance.state)}
                  </Flex>
                </Flex>
                <Margin top={1}>
                  <Flex>
                    <Flex>
                      <GreyLabel>Created: </GreyLabel>
                      <Label>
                        {' '}
                        {distanceInWordsToNow(instance.created)} ago
                      </Label>
                    </Flex>
                    <HorizontalDivider />
                    <Flex>
                      <GreyLabel>Updated: </GreyLabel>
                      <Label>
                        {' '}
                        {distanceInWordsToNow(instance.updated)} ago
                      </Label>
                    </Flex>
                  </Flex>
                </Margin>
              </Margin>
              <Flex>
                <Flex>
                  <Button
                    secondary
                    bold
                    loading={starting}
                    disabled={instance.state === 'RUNNING'}
                    onClick={() => handleInstance(instance.id, 'start')}
                  >
                    Start
                  </Button>
                  <Button
                    secondary
                    bold
                    loading={stopping}
                    disabled={instance.state === 'STOPPED'}
                    onClick={() => handleInstance(instance.id, 'stop')}
                  >
                    Stop
                  </Button>

                  <Button
                    secondary
                    bold
                    loading={rebooting}
                    disabled={instance.state === 'PROVISIONING'}
                    onClick={() => handleInstance(instance.id, 'reboot')}
                  >
                    Restart
                  </Button>
                </Flex>
                <FlexEnd>
                  <Button
                    error
                    bold
                    loading={deleteing}
                    disabled={instance.state === 'PROVISIONING'}
                    onClick={() => handleInstance(instance.id, 'delete')}
                  >
                    Delete
                  </Button>
                </FlexEnd>
              </Flex>
              <Margin bottom={5} top={4}>
                <Divider height="1px" />
              </Margin>
              <Row>
                <Col md={7} xs={12}>
                  <FormLabel>Short ID</FormLabel>
                  <InputIconWrapper>
                    <Input fluid value={instance.id.split('-')[0]} />
                    {copyToClipboard(instance.id.split('-')[0])}
                  </InputIconWrapper>
                </Col>
              </Row>
              <Row>
                <Col md={7} xs={12}>
                  <FormLabel>ID</FormLabel>
                  <InputIconWrapper>
                    <Input fluid value={instance.id} />
                    {copyToClipboard(instance.id)}
                  </InputIconWrapper>
                </Col>
              </Row>
              <Row>
                <Col md={7} xs={12}>
                  <FormLabel>CN UUID</FormLabel>
                  <InputIconWrapper>
                    <Input fluid value={instance.compute_node} />
                    {copyToClipboard(instance.compute_node)}
                  </InputIconWrapper>
                </Col>
              </Row>

              {instance.image && (
                <Row>
                  <Col md={7} xs={12}>
                    <FormLabel>Image UUID</FormLabel>
                    <InputIconWrapper>
                      <Input fluid value={instance.image.id} />
                      {copyToClipboard(instance.image.id)}
                    </InputIconWrapper>
                  </Col>
                </Row>
              )}

              <Row>
                <Col md={7} xs={12}>
                  <FormLabel>Login</FormLabel>
                  <InputIconWrapper>
                    <Input fluid value={`$ root@${instance.primary_ip}`} />
                    {copyToClipboard(`$ root@${instance.primary_ip}`)}
                  </InputIconWrapper>
                </Col>
              </Row>

              {instance.ips.map((ip, i) => (
                <Row>
                  <Col md={7} xs={12}>
                    <FormLabel>IP address {i + 1}</FormLabel>
                    <InputIconWrapper>
                      <Input fluid value={ip} />
                      {copyToClipboard(ip)}
                    </InputIconWrapper>
                  </Col>
                </Row>
              ))}
            </CardOutlet>
          </Card>
        </Col>
      </Row>
    ];

  const _error = error &&
    !_loading &&
    !instance && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>
          An error occurred while loading your instance summary
        </MessageDescription>
      </Message>
    );

  const _mutationError = mutationError && (
    <Message error>
      <MessageTitle>Ooops!</MessageTitle>
      <MessageDescription>{mutationError}</MessageDescription>
    </Message>
  );

  return (
    <ViewContainer center={Boolean(_loading)} main>
      {_loading}
      {_error}
      {_mutationError}
      {_summary}
    </ViewContainer>
  );
};

Summary.propTypes = {
  loading: PropTypes.bool
};

export default compose(
  graphql(StopInstance, { name: 'stop' }),
  graphql(StartInstance, { name: 'start' }),
  graphql(RebootInstance, { name: 'reboot' }),
  graphql(DeleteInstance, { name: 'reboot' }),
  graphql(GetInstance, {
    options: ({ match }) => ({
      pollInterval: 1000,
      variables: {
        name: get(match, 'params.instance')
      }
    }),
    props: ({ data: { loading, error, variables, ...rest } }) => ({
      instance: find(get(rest, 'machines', []), ['name', variables.name]),
      loading,
      error
    })
  }),
  connect(
    (state, ownProps) => {
      if (!ownProps.instance) return ownProps;

      return {
        ...ownProps,
        starting: state.values[`${ownProps.instance.id}-home-starting`],
        stopping: state.values[`${ownProps.instance.id}-home-stoping`],
        rebooting: state.values[`${ownProps.instance.id}-home-rebooting`],
        deleteing: state.values[`${ownProps.instance.id}-home-deleteing`],
        mutationError:
          state.values[`${ownProps.instance.id}-home-mutation-error`]
      };
    },
    (disptach, ownProps) => ({
      handleInstance: async (id, action) => {
        const gerund = `${action}ing`;
        const name = `${id}-home-${gerund}`;
        const setLoadingTrue = set({
          name,
          value: true
        });

        disptach(setLoadingTrue);

        const [err] = await intercept(ownProps[action]({ variables: { id } }));

        const setLoadingFalse = set({
          name,
          value: false
        });

        if (err) {
          // parses the error to handle existance or not of graphQLErrors
          const parseError = ({ graphQLErrors = [], message = '' }) =>
            graphQLErrors.length
              ? graphQLErrors.map(({ message }) => message).join('\n')
              : message;

          const createError = set({
            name: `${id}-home-mutation-error`,
            value: parseError(err)
          });

          return disptach([createError, setLoadingFalse]);
        }

        disptach(setLoadingFalse);
      }
    })
  )
)(Summary);
