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
    const deploymentGroupPathName = params.deploymentGroup;
    const servicePathName = params.service;

    const sections = servicePathName ?
      state.ui.sections.services :
      deploymentGroupPathName ?
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
