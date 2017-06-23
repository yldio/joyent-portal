import React from 'react';
import { connect } from 'react-redux';
import { Menu as MenuComponent } from '@components/navigation';

const Menu = ({ sections }) =>
  sections && sections.length ? <MenuComponent links={sections} /> : null;

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
