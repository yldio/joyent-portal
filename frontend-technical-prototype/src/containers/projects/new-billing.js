import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orgByIdSelector } from '@state/selectors';
import { handleNewProject } from '@state/actions';
import { LayoutContainer } from '@components/layout';

import PropTypes from '@root/prop-types';
import CreateBilling from '@components/new-project/new-billing';

const NewBillingForm = reduxForm({
  form: 'create-project'
})(CreateBilling);

const NewBilling = ({
  handleNewProject,
  org,
  match,
  push
}) => {
  const onBack = (evt) =>
    push(`/${org.id}/projects/~create/billing`);

  const onSubmit = (values) => {
    handleNewProject({
      values,
      org
    });

    push(`/${org.id}/projects`);
  };

  return (
    <LayoutContainer>
      <NewBillingForm
        onBack={onBack}
        onSubmit={onSubmit}
      />
    </LayoutContainer>
  );
};

NewBilling.propTypes = {
  handleNewProject: React.PropTypes.func.isRequired,
  org: PropTypes.org.isRequired,
  match: React.PropTypes.object,
  push: React.PropTypes.func
};

const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  // TODO add cards - as above
  org: orgByIdSelector(match.params.org)(state),
  match,
  push
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProject: (values) => dispatch(handleNewProject(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBilling);
