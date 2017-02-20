import React from 'react';
import { connect } from 'react-redux';
import { toggleInstanceCollapsed } from '@state/actions';
import EmptyInstances from '@components/empty/instances';
import PropTypes from '@root/prop-types';
import InstanceList from '@components/instance-list';
import { instancesByServiceIdSelector } from '@state/selectors';

const Instances = ({
  instances = [],
  toggleCollapsed = () => null
}) => {
  const empty = instances.length ? null : (
    <EmptyInstances />
  );

  return (
    <div>
      {empty}
      <InstanceList
        instances={instances}
        toggleCollapsed={toggleCollapsed}
      />
    </div>
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
  instances: instancesByServiceIdSelector(match.params.serviceId)(state)
});

const mapDispatchToProps = (dispatch) => ({
  toggleCollapsed: (uuid) => dispatch(toggleInstanceCollapsed(uuid))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Instances);
