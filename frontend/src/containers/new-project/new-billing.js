import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orgByIdSelector } from '@state/selectors';
import { handleNewProject } from '@state/actions';

import PropTypes from '@root/prop-types';
import CreateBilling from '@components/new-project/new-billing';

const NewBillingForm = reduxForm({
  form: 'create-project'
})(CreateBilling);

const NewBilling = ({
  handleNewProject,
  router,
  org
}) => {
  const onBack = (evt) =>
    router.push(`/${org.id}/new-project/billing`);

  const onSubmit = (values) => {
    handleNewProject({
      values,
      org
    });

    router.push(`/${org.id}/projects`);
  };

  return (
    <NewBillingForm
      onBack={onBack}
      onSubmit={onSubmit}
    />
  );
};

NewBilling.propTypes = {
  handleNewProject: React.PropTypes.func.isRequired,
  org: PropTypes.org.isRequired,
  router: React.PropTypes.object
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  // TODO add cards - as above
  org: orgByIdSelector(match.params.org)(state)
});

const mapDispatchToProps = (dispatch) => ({
  handleNewProject: (values) => dispatch(handleNewProject(values))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewBilling);
