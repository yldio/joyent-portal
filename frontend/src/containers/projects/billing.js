import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orgByIdSelector } from '@state/selectors';
import { handleNewProject } from '@state/actions';
import { LayoutContainer } from '@components/layout';

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
  org,
  match,
  push
}) => {
  const onSubmit = (values) => {
    // TODO will need to save exisiting card to project
    handleNewProject({
      values,
      org
    });

    push(`/${org.id}/projects`);
  };

  const onNewBilling = (evt) =>
    push(`${match.url}/create`);

  return (
    <LayoutContainer>
      <NewProjectBillingForm
        cards={cards}
        onNewBilling={onNewBilling}
        onSubmit={onSubmit}
        org={org}
      />
    </LayoutContainer>
  );
};

Billing.propTypes = {
  cards: React.PropTypes.array, // TODO set up example card in thingie data
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
)(Billing);
