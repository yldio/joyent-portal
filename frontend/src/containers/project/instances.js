import React from 'react';
import { connect } from 'react-redux';
import { toggleInstanceCollapsed } from '@state/actions';
import EmptyInstances from '@components/empty/instances';
import PropTypes from '@root/prop-types';
import Section from './section';
import InstanceList from '@components/instance-list';
import { instancesByProjectIdSelector } from '@state/selectors';

const Instances = (props) => {
  const {
    instances = [],
    toggleCollapsed = () => null
  } = props;

  const empty = instances.length ? null : (
    <EmptyInstances />
  );

  return (
    <Section {...props}>
      {empty}
      <InstanceList
        instances={instances}
        toggleCollapsed={toggleCollapsed}
      />
    </Section>
  );
};

Instances.propTypes = {
  instances: React.PropTypes.arrayOf(PropTypes.instance),
  toggleCollapsed: React.PropTypes.func
};

const mapStateToProps = (state, {
  match = {
    params: {}
  }
}) => ({
  instances: instancesByProjectIdSelector(match.params.projectId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollapsed: (uuid) => dispatch(toggleInstanceCollapsed(uuid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instances);

