import React from 'react';
import { connect } from 'react-redux';
import Section from './section';
import { LayoutContainer } from '@components/layout';

const Settings = (props) => (
  <Section {...props}>
    <LayoutContainer>
      <p>settings</p>
    </LayoutContainer>
  </Section>
);

Settings.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(
  mapStateToProps
)(Settings);
