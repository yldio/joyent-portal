import React from 'react';
import { connect } from 'react-redux';
import Section from './section';

const Settings = (props) => (
  <Section {...props}>
    <p>settings</p>
  </Section>
);

Settings.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps
)(Settings);
