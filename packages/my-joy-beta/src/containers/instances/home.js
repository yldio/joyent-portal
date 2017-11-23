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

import GetInstance from '@graphql/get-instance.gql';
import StartInstance from '@graphql/start-instance.gql';
import StopInstance from '@graphql/stop-instance.gql';
import RebootInstance from '@graphql/reboot-instance.gql';
import DeleteInstance from '@graphql/delete-instance.gql';
import HomeScreen from '@components/instances/home';
import parseError from '@state/parse-error';

const Home = ({
  instance,
  loading,
  loadingError,
  mutationError,
  handleAction,
  starting,
  stopping,
  rebooting,
  deleteing
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
        onAction={handleAction}
      />
    );

  const _error = loadingError &&
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

Home.propTypes = {
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
      loadingError: error
    })
  }),
  connect(
    (state, ownProps) => {
      const { instance = {} } = ownProps;
      const { id } = instance;

      if (!id) {
        return ownProps;
      }

      return {
        ...ownProps,
        starting: state.values[`${id}-home-starting`],
        stopping: state.values[`${id}-home-stoping`],
        rebooting: state.values[`${id}-home-rebooting`],
        deleteing: state.values[`${id}-home-deleteing`],
        mutationError: state.values[`${id}-home-mutation-error`]
      };
    },
    (disptach, ownProps) => ({
      handleAction: async action => {
        const { instance } = ownProps;
        const { id } = instance;

        const gerund = `${action}ing`;
        const name = `${id}-home-${gerund}`;

        // sets loading to true
        disptach(
          set({
            name,
            value: true
          })
        );

        // calls mutation and waits while loading is still true
        const [err] = await intercept(
          ownProps[action]({
            variables: { id }
          })
        );

        if (!err && action === 'delete') {
          const { history } = ownProps;
          return history.push(`/instances/`);
        }

        // after mutation, sets loading back to false
        const setLoadingFalse = set({
          name,
          value: false
        });

        // if error, sets error value
        const mutationError =
          err &&
          set({
            name: `${id}-home-mutation-error`,
            value: parseError(err)
          });

        return disptach([mutationError, setLoadingFalse].filter(Boolean));
      }
    })
  )
)(Home);
