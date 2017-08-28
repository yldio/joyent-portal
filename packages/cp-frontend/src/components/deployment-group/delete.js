import React from 'react';
import PropTypes from 'prop-types';
import { ModalHeading, ModalText, Button } from 'joyent-ui-toolkit';

const DeploymentGroupDelete = ({
  deploymentGroup,
  onCancelClick = () => {},
  onConfirmClick = () => {}
}) => (
  <div>
    <ModalHeading>
      Deleting a deployment group: <br /> {deploymentGroup.name}
    </ModalHeading>
    <ModalText marginBottom="3">
      Deleting a deployment group will also remove all of the services and
      instances associated with that deployment group. Are you sure you want to
      continue?
    </ModalText>
    <Button onClick={onCancelClick} secondary>
      Cancel
    </Button>
    <Button onClick={onConfirmClick}>Delete deployment group</Button>
  </div>
);

DeploymentGroupDelete.propTypes = {
  deploymentGroup: PropTypes.object.isRequired,
  onCancelClick: PropTypes.func,
  onConfirmClick: PropTypes.func
};

export default DeploymentGroupDelete;
