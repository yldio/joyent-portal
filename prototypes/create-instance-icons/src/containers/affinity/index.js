import React from 'react';
import { connect } from 'react-redux';
import Affinity from '@components/affinity';

const AffinityHOC = ({ affinity }) => <Affinity affinity={affinity} />;

const mapStateToProps = state => {
  return {
    affinity: state.form.affinityForm
  };
};

export default connect(mapStateToProps)(AffinityHOC);
