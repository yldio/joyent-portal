import React, { Fragment, PureComponent } from 'react';
import { withRouter } from 'react-router';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import { Link as BaseLink } from 'react-router-dom';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin, Padding } from 'styled-components-spacing';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled from 'styled-components';
import is from 'styled-is';
import isFunction from 'lodash.isfunction';
import remcalc from 'remcalc';

import {
  Card as BaseCard,
  CardOutlet,
  Divider,
  H3,
  P,
  ArrowIcon
} from 'joyent-ui-toolkit';

import { Error as ErrorIcon } from './status-icon';

import { QueryBreakpoints } from 'joyent-ui-toolkit';

const { SmallOnly, Medium } = QueryBreakpoints;

const Card = styled(BaseCard)`
  ${is('error')`
    border: ${remcalc(1)} solid ${props => props.theme.redDark};
  `};

  ${is('expanded')`
    box-shadow: 0 ${remcalc(2)} ${remcalc(12)} rgba(0, 0, 0, 0.1);
  `};
}`;

const Link = styled(BaseLink)`
  color: ${props => props.theme.primary};

  :active {
    color: #436275;
  }
`;

export const Header = withRouter(({ icon = null, location, children }) => (
  <Subscriber channel="create-resource-group">
    {({ namespace }) => (
      <Subscriber channel="create-resource-step">
        {({ expanded, optional, saved, name, isValid, readOnly }) => (
          <Fragment>
            <Flex justifyBetween>
              <FlexItem>
                <Flex alignCenter>
                  <Medium>
                    <FlexItem>
                      <Margin right="2">{icon}</Margin>
                    </FlexItem>
                  </Medium>
                  <FlexItem>
                    <H3 bold>{children}</H3>
                  </FlexItem>
                  {/* improve this */}
                  <Medium>
                    {readOnly && optional ? (
                      <Fragment>
                        <FlexItem>
                          <Margin horizontal="1">
                            <Divider vertical />
                          </Margin>
                        </FlexItem>
                        <FlexItem>
                          <P optional>Optional</P>
                        </FlexItem>
                      </Fragment>
                    ) : null}
                  </Medium>
                </Flex>
              </FlexItem>
              {readOnly ? null : (
                <FlexItem alignCenter>
                  <Link
                    to={expanded ? `/${namespace}` : `/${namespace}/${name}`}
                  >
                    <Flex alignCenter>
                      {expanded ? 'Save and Collapse' : 'Edit'}
                      <Margin left="1">
                        <Flex>
                          <ArrowIcon
                            fill="primary"
                            direction={expanded ? 'up' : 'down'}
                          />
                        </Flex>
                      </Margin>
                    </Flex>
                  </Link>
                </FlexItem>
              )}
              {!expanded && !isValid ? (
                <FlexItem>
                  <ErrorIcon />
                </FlexItem>
              ) : null}
            </Flex>
            {expanded || saved ? (
              <Margin vertical="3">
                <Divider noMargin />
              </Margin>
            ) : null}
          </Fragment>
        )}
      </Subscriber>
    )}
  </Subscriber>
));

export const Description = ({ href = '', children }) => (
  <Subscriber channel="create-resource-step">
    {({ expanded }) =>
      expanded ? (
        <Row>
          <Col xs={12} sm={8}>
            <P>
              {children} {href ? <Link to={href}>Read the docs</Link> : null}
            </P>
          </Col>
        </Row>
      ) : null
    }
  </Subscriber>
);

export const Preview = ({ children }) => (
  <Subscriber channel="create-resource-step">
    {({ expanded, saved, readOnly }) =>
      !expanded && (saved || readOnly) ? <Fragment>{children}</Fragment> : null
    }
  </Subscriber>
);

export const Outlet = ({ children }) => (
  <Subscriber channel="create-resource-group">
    {({ namespace }) => (
      <Subscriber channel="create-resource-step">
        {({ expanded, next, readOnly }) =>
          expanded && isFunction(children) && !readOnly
            ? children({ next: `/${namespace}/${next}` })
            : null
        }
      </Subscriber>
    )}
  </Subscriber>
);

export default class Step extends PureComponent {
  getSnapshotBeforeUpdate(prevProps) {
    const { expanded: wasExpanded } = prevProps;
    const { onDefocus, getValue, expanded } = this.props;

    if (!onDefocus || !getValue) {
      return;
    }

    if (wasExpanded && !expanded) {
      onDefocus(getValue());
    }
  }

  render() {
    const {
      expanded = false,
      optional = false,
      saved = false,
      next = '',
      name = '',
      isValid = true,
      readOnly = false,
      children
    } = this.props;

    return (
      <Broadcast
        channel="create-resource-step"
        value={{ expanded, optional, saved, next, name, isValid, readOnly }}
      >
        <Card expanded={expanded} error={!expanded && !isValid}>
          <CardOutlet>
            <SmallOnly>
              <Padding all="3">{children}</Padding>
            </SmallOnly>
            <Medium>
              <Padding all="5">{children}</Padding>
            </Medium>
          </CardOutlet>
        </Card>
      </Broadcast>
    );
  }
}
export { StatusIcon } from './status-icon';
export { Saved as SavedIcon } from './status-icon';
export { Error as ErrorIcon } from './status-icon';
export { default as Provider } from './provider';
