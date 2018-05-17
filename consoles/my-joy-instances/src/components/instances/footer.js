import React from 'react';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { withTheme } from 'styled-components';
import { Margin } from 'styled-components-spacing';
import Flex from 'styled-flex-component';

import {
  Button,
  StickyFooter,
  QueryBreakpoints,
  StartIcon,
  StopIcon,
  ResetIcon,
  DeleteIcon
} from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

export default withTheme(
  ({
    submitting = false,
    statuses = {},
    allowedActions = {},
    onStart,
    onStop,
    onReboot,
    onRemove,
    theme = {}
  }) => (
    <StickyFooter fixed bottom fill="#FAFAFA">
      <Row between="xs" middle="xs">
        <Col xs={7}>
          <Flex>
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
              <Margin right={1}>
                <Medium key="medium">
                  <Button
                    type="button"
                    onClick={onStart}
                    disabled={submitting || !allowedActions.start}
                    loading={submitting && statuses.starting}
                    secondary
                    icon
                  >
                    <Margin right={1}>
                      <StartIcon
                        disabled={submitting || !allowedActions.start}
                      />
                    </Margin>
                    <span>Start</span>
                  </Button>
                </Medium>
              </Margin>
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
              <Margin right={1}>
                <Medium key="medium">
                  <Button
                    type="button"
                    onClick={onStop}
                    disabled={submitting || !allowedActions.stop}
                    loading={submitting && statuses.stopping}
                    secondary
                    icon
                  >
                    <Margin right={1}>
                      <StopIcon disabled={submitting || !allowedActions.stop} />
                    </Margin>
                    <span>Stop</span>
                  </Button>
                </Medium>
              </Margin>
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
              <Margin right={1}>
                <Medium key="medium">
                  <Button
                    type="button"
                    onClick={onReboot}
                    disabled={submitting || !allowedActions.reboot}
                    loading={submitting && statuses.rebooting}
                    secondary
                    icon
                  >
                    <ResetIcon
                      disabled={submitting || !allowedActions.reboot}
                    />
                    <span>Reboot</span>
                  </Button>
                </Medium>
              </Margin>
            ]}
          </Flex>
        </Col>
        {onRemove && (
          <Col xs={5}>
            <SmallOnly key="small-only">
              <Button
                type="button"
                onClick={onRemove}
                disabled={submitting || !allowedActions.remove}
                loading={submitting && statuses.removing}
                secondary
                error
                right
                small
                icon
              >
                <DeleteIcon
                  disabled={submitting}
                  fill={
                    !(submitting || !allowedActions.remove)
                      ? theme.red
                      : undefined
                  }
                />
              </Button>
            </SmallOnly>
            <Medium key="medium">
              <Button
                type="button"
                onClick={onRemove}
                disabled={submitting || !allowedActions.remove}
                loading={submitting && statuses.removing}
                error
                secondary
                right
                icon
              >
                <Margin right={1}>
                  <DeleteIcon
                    disabled={submitting || !allowedActions.remove}
                    fill={
                      !(submitting || !allowedActions.remove)
                        ? theme.red
                        : undefined
                    }
                  />
                </Margin>
                <span>Remove</span>
              </Button>
            </Medium>
          </Col>
        )}
      </Row>
    </StickyFooter>
  )
);
