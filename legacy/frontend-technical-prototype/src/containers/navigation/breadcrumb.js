import React from 'react';
import { connect } from 'react-redux';
import {
  orgByIdSelector,
  projectByIdSelector,
  serviceByIdSelector
} from '@root/state/selectors';
import { Breadcrumb as BreadcrumbComponent } from '@components/navigation';

const Breadcrumb = ({
  location,
  match,
  org,
  project,
  service
}) => {

  const path = location.pathname.split('/');

  const links = [{
    name: org.name,
    pathname: path.slice(0, 2).join('/')
  }];

  if(project) {
    links.push({
      name: project.name,
      pathname: path.slice(0, 4).join('/')
    });
  }

  if(service) {
    links.push({
      name: service.name,
      pathname: path.slice(0, 6).join('/')
    });
  }

  // TODO add people etc

  return (
    <BreadcrumbComponent name={links} />
  );
};

Breadcrumb.propTypes = {
  location: React.PropTypes.object.isRequired,
  match: React.PropTypes.object.isRequired,
  org: React.PropTypes.object.isRequired,
  project: React.PropTypes.object,
  service: React.PropTypes.object
};

const mapStateToProps = (state, {
  location,
  match = {
    params: {}
  }
}) => ({
  location,
  match,
  org: orgByIdSelector(match.params.org)(state),
  project: projectByIdSelector(match.params.project)(state),
  service: serviceByIdSelector(match.params.service)(state)
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Breadcrumb);
