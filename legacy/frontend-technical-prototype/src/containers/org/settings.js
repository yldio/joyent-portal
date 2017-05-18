import React from 'react';
import { connect } from 'react-redux';
import { LayoutContainer } from '@components/layout';

const Settings = (props) => (
  <LayoutContainer>
    <p>Settings</p>
  </LayoutContainer>
);

Settings.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps
)(Settings);
