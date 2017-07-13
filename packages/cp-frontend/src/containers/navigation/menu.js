import React from 'react';
import { connect } from 'react-redux';
import { Menu as MenuComponent } from '@components/navigation';

const Menu = ({match, sections}) => {
  if(!sections || !sections.length) {
    return null;
  }

  const sectionsWithPathnames = sections.map(section => {
    return {
      name: section.name,
      pathname: `${match.url}/${section.pathname}`
    };
  });
  return <MenuComponent links={sectionsWithPathnames} /> ;
}

const ConnectedMenu = connect(
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
)(Menu);

export default ConnectedMenu;
