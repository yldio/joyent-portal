import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orgByIdSelector } from '@state/selectors';
import PropTypes from '@root/prop-types';
import CreateProject from '@components/new-project';

const NewProjectForm = reduxForm({
  form: 'create-project',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CreateProject);

const NewProject = ({
  org,
  router
}) => {
  const onCancel = (values) =>
    router.push(`/${org.id}/projects`);

  const onSubmit = (values) =>
    router.push(`/${org.id}/new-project/billing`);

  return (
    <NewProjectForm
      onCancel={onCancel}
      onSubmit={onSubmit}
      org={org}
    />
  );
};

NewProject.propTypes = {
  org: PropTypes.org.isRequired,
  router: React.PropTypes.object
};
// TODO we'll need to know whether there any cards
// otherwise go to new billing straight away
const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  org: orgByIdSelector(match.params.org)(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
