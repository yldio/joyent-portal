import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'react-apollo';
import withNotFound from './not-found-hoc';
import { Menu as MenuComponent } from '@components/navigation';

export const Menu = ({ location, match, sections }) => {

  if (!sections || !sections.length) {
    return null;
  }

  const sectionsWithPathnames = sections.map(section => {
    return {
      name: section.name,
      pathname: `${match.url}/${section.pathname}`
    };
  });
  return <MenuComponent links={sectionsWithPathnames} />;
};

const connectMenu = connect(
  (state, ownProps) => {
    const params = ownProps.match.params;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;

    if ((deploymentGroupSlug || '').match(/^~/)) {
      return {};
    }

    const sections = serviceSlug
      ? state.ui.sections.services
      : deploymentGroupSlug ? state.ui.sections.deploymentGroups : null;

    return {
      sections
    };
  },
  dispatch => ({})
);

export default compose(
  connectMenu,
  withNotFound()
)(Menu);
