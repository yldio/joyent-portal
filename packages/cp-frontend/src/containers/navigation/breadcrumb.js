import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import { Breadcrumb as BreadcrumbComponent } from '@components/navigation';
import withNotFound from './not-found-hoc';
import {
  deploymentGroupBySlugSelector,
  serviceBySlugSelector
} from '@root/state/selectors';

export const Breadcrumb = ({
  deploymentGroup,
  service,
  location: { pathname }
}) => {
  const path = pathname.split('/');

  const links = [
    {
      name: 'Dashboard',
      pathname: '/'
    }
  ];

  if (deploymentGroup) {
    links.push({
      name: deploymentGroup.name,
      pathname: path.slice(0, 3).join('/')
    });
  }

  if (service) {
    links.push({
      name: service.name,
      pathname: path.slice(0, 5).join('/')
    });
  }

  return <BreadcrumbComponent links={links} />;
};

Breadcrumb.propTypes = {
  deploymentGroup: PropTypes.object,
  service: PropTypes.object,
  location: PropTypes.object
};

const connectBreadcrumb = connect(
  (state, ownProps) => {
    const params = ownProps.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;
    return {
      deploymentGroup: deploymentGroupBySlugSelector(deploymentGroupSlug)(
        state
      ),
      service: serviceBySlugSelector(serviceSlug)(state),
      location: ownProps.location
    };
  },
  dispatch => ({})
);

export default compose(connectBreadcrumb, withNotFound())(Breadcrumb);
