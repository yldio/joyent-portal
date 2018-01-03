import React from 'react';
import {
  Row,
  Col,
  Button,
  Footer,
  QueryBreakpoints,
  StartIcon,
  StopIcon,
  ResetIcon,
  DeleteIcon
} from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

export default ({
  submitting = false,
  statuses = {},
  allowedActions = {},
  onStart,
  onStop,
  onReboot,
  onDelete
}) => (
  <Footer fixed bottom>
    <Row between="xs" middle="xs">
      <Col xs={7}>
        {onStart && [
          <SmallOnly key="small-only">
            <Button
              type="button"
              onClick={onStart}
              disabled={submitting || !allowedActions.start}
              loading={submitting && statuses.starting}
              secondary
              small
              icon
            >
              <StartIcon disabled={submitting || !allowedActions.start} />
            </Button>
          </SmallOnly>,
          <Medium key="medium">
            <Button
              type="button"
              onClick={onStart}
              disabled={submitting || !allowedActions.start}
              loading={submitting && statuses.starting}
              secondary
              icon
            >
              <StartIcon disabled={submitting || !allowedActions.start} />
              <span>Start</span>
            </Button>
          </Medium>
        ]}
        {onStop && [
          <SmallOnly key="small-only">
            <Button
              type="button"
              onClick={onStop}
              disabled={submitting || !allowedActions.stop}
              loading={submitting && statuses.stopping}
              secondary
              small
              icon
            >
              <StopIcon disabled={submitting || !allowedActions.stop} />
            </Button>
          </SmallOnly>,
          <Medium key="medium">
            <Button
              type="button"
              onClick={onStop}
              disabled={submitting || !allowedActions.stop}
              loading={submitting && statuses.stopping}
              secondary
              icon
            >
              <StopIcon disabled={submitting || !allowedActions.stop} />
              <span>Stop</span>
            </Button>
          </Medium>
        ]}
        {onReboot && [
          <SmallOnly key="small-only">
            <Button
              type="button"
              onClick={onReboot}
              disabled={submitting || !allowedActions.reboot}
              loading={submitting && statuses.rebooting}
              secondary
              small
              icon
            >
              <ResetIcon disabled={submitting || !allowedActions.reboot} />
            </Button>
          </SmallOnly>,
          <Medium key="medium">
            <Button
              type="button"
              onClick={onReboot}
              disabled={submitting || !allowedActions.reboot}
              loading={submitting && statuses.rebooting}
              secondary
              icon
            >
              <ResetIcon disabled={submitting || !allowedActions.reboot} />
              <span>Reboot</span>
            </Button>
          </Medium>
        ]}
      </Col>
      {onDelete && (
        <Col xs={5}>
          <SmallOnly key="small-only">
            <Button
              type="button"
              onClick={onDelete}
              disabled={submitting}
              loading={submitting && statuses.deleting}
              secondary
              right
              small
              icon
            >
              <DeleteIcon disabled={submitting} />
            </Button>
          </SmallOnly>
          <Medium key="medium">
            <Button
              type="button"
              onClick={onDelete}
              disabled={submitting}
              loading={submitting && statuses.deleting}
              secondary
              right
              icon
            >
              <DeleteIcon disabled={submitting} />
              <span>Delete</span>
            </Button>
          </Medium>
        </Col>
      )}
    </Row>
  </Footer>
);
