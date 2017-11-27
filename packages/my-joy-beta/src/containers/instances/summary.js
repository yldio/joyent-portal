import React from 'react';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import find from 'lodash.find';
import get from 'lodash.get';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import intercept from 'apr-intercept';
import {
  ViewContainer,
  StatusLoader,
  Message,
  MessageDescription,
  MessageTitle
} from 'joyent-ui-toolkit';

import HomeScreen from '@components/instances/home';

import GetInstance from '@graphql/get-instance.gql';
import StartInstance from '@graphql/start-instance.gql';
import StopInstance from '@graphql/stop-instance.gql';
import RebootInstance from '@graphql/reboot-instance.gql';
import DeleteInstance from '@graphql/delete-instance.gql';

const Summary = ({
  instance,
  loading,
  error,
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
    instance && (
      <HomeScreen
        instance={instance}
        starting={starting}
        stopping={stopping}
        rebooting={rebooting}
        deleteing={deleteing}
        handleInstance={handleInstance}
      />
    );

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
