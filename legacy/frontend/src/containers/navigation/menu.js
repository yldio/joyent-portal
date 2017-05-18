import React from 'react';
import { connect } from 'react-redux';
import { Menu as MenuComponent } from '@components/navigation';

const Menu = ({
  sections,
  matchUrl
}) => {

  return (
    <MenuComponent links={sections} />
  );
}

const ConnectedMenu = connect(
  (state, ownProps) => {

    const params = ownProps.match.params;
    const matchUrl = ownProps.match.url;
    const deploymentGroupSlug = params.deploymentGroup;
    const serviceSlug = params.service;

    const sections = serviceSlug ?
      state.ui.sections.services :
      deploymentGroupSlug ?
      state.ui.sections.deploymentGroups :
      null;

    return {
      sections,
      matchUrl
    };
  },
  (dispatch) => ({})
)(Menu);

export default ConnectedMenu;
