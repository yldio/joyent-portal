import React from 'react';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import { orgByIdSelector } from '@state/selectors';
import PropTypes from '@root/prop-types';
import CreateProject from '@components/new-project';
import { LayoutContainer } from '@components/layout';

const NewProjectForm = reduxForm({
  form: 'create-project',
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(CreateProject);

const NewProject = ({
  org,
  match,
  push
}) => {
  const onCancel = (values) =>
    push(`/${match.params.org}/projects`);

  const onSubmit = (values) =>
    push(`${match.url}/billing`);

  return (
    <LayoutContainer>
      <NewProjectForm
        onCancel={onCancel}
        onSubmit={onSubmit}
        org={org}
      />
    </LayoutContainer>
  );
};

NewProject.propTypes = {
  org: PropTypes.org.isRequired,
  match: React.PropTypes.object,
  push: React.PropTypes.func
};
// TODO we'll need to know whether there any cards
// otherwise go to new billing straight away
const mapStateToProps = (state, {
  match = {
    params: {}
  },
  push
}) => ({
  org: orgByIdSelector(match.params.org)(state),
  match,
  push
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewProject);
