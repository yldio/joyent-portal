import React from 'react';
import { withRouter } from 'react-router';
import { compose } from 'react-apollo';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import get from 'lodash.get';

import Name from '@components/create-instance/name';

const NameContainer = ({ expanded, name, handleSubmit, handleCancel }) => (
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
