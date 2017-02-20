import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orgByIdSelector } from '@state/selectors';
import { handleNewProject } from '@state/actions';

import PropTypes from '@root/prop-types';
import NewProjectBilling from '@components/new-project/billing';

const NewProjectBillingForm = reduxForm({
  form: 'create-project',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(NewProjectBilling);

const Billing = ({
  cards,
  handleNewProject,
  router,
  org
}) => {
  const onSubmit = (values) => {
    // TODO will need to save exisiting card to project
    handleNewProject({
      values,
      org
    });

    router.push(`/${org.id}/projects`);
  };

  const onNewBilling = (evt) =>
    router.push(`/${org.id}/new-project/new-billing`);

  return (
    <NewProjectBillingForm
      cards={cards}
      onNewBilling={onNewBilling}
      onSubmit={onSubmit}
      org={org}
    />
  );
};

Billing.propTypes = {
  cards: React.PropTypes.array, // TODO set up example card in thingie data
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
)(Billing);
