import React, { Fragment } from 'react';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import { NameIcon } from 'joyent-ui-toolkit';

import Name from '@components/create-instance/name';
import Title from '@components/create-instance/title';

const NameContainer = ({ expanded, name, handleSubmit, handleCancel }) => (
  <Fragment>
    <Title icon={<NameIcon />}>Instance name</Title>
    <ReduxForm
      form="create-instance-name"
      destroyOnUnmount={false}
      forceUnregisterOnUnmount={true}
      onSubmit={handleSubmit}
    >
      {props => (
        <Name
          {...props}
          name={name}
          expanded={expanded}
          onCancel={handleCancel}
        />
      )}
    </ReduxForm>
  </Fragment>
);

export default compose(
  withRouter,
  connect(
    (state, ownProps) => ({
      ...ownProps,
      name: get(state, 'form.create-instance-name.values.name')
    }),
    (dispatch, { history }) => ({
      handleSubmit: () => history.push(`/instances/~create/image`),
      handleCancel: () => history.push(`/instances/~create/name`)
    })
  )
)(NameContainer);
