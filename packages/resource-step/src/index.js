import React, { Fragment, PureComponent } from 'react';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import { Link as BaseLink } from 'react-router-dom';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin, Padding } from 'styled-components-spacing';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import styled from 'styled-components';
import is from 'styled-is';
import remcalc from 'remcalc';

import {
  Card as BaseCard,
  CardOutlet,
  Divider,
  H3,
  P,
  ArrowIcon
} from 'joyent-ui-toolkit';

import { Saved as SavedIcon, Error as ErrorIcon } from './status-icon';

const Card = styled(BaseCard)`
  ${is('error')`
    border: ${remcalc(1)} solid ${props => props.theme.redDark};
  `};

  ${is('expanded')`
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.1);
  `};
}`;

const Link = styled(BaseLink)`
  color: ${props => props.theme.primary};

  :active {
    color: #436275;
  }
`;

export const Header = ({ icon = null, children }) => (
  <Subscriber channel="create-resource-group">
    {({ namespace }) => (
      <Subscriber channel="create-resource-step">
        {({ expanded, optional, saved, name, isValid }) => (
          <Fragment>
            <Flex justifyBetween>
              <FlexItem>
                <Flex alignCenter>
                  <FlexItem>{icon}</FlexItem>
                  <FlexItem>
                    <Divider vertical />
                  </FlexItem>
                  <FlexItem>
                    <H3 bold>{children}</H3>
                  </FlexItem>
                  <FlexItem>
                    <Divider vertical />
                  </FlexItem>
                  <FlexItem alignCenter>
                    <Link
                      to={expanded ? `/${namespace}` : `/${namespace}/${name}`}
                    >
                      <Flex alignCenter>
                        {expanded ? 'Save and Collase' : 'Expand'}
                        <Margin left={1}>
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
                </Flex>
              </FlexItem>
              {isValid && !expanded && saved ? (
                <FlexItem>
                  <SavedIcon />
                </FlexItem>
              ) : null}
              {/* improve this */}
              {!saved && optional ? (
                <FlexItem>
                  <P optional>Optional</P>
                </FlexItem>
              ) : null}
              {!expanded && !isValid ? (
                <FlexItem>
                  <ErrorIcon />
                </FlexItem>
              ) : null}
            </Flex>
            {expanded || saved ? (
              <Margin vertical={3}>
                <Divider noMargin />
              </Margin>
            ) : null}
          </Fragment>
        )}
      </Subscriber>
    )}
  </Subscriber>
);

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
    {({ expanded, saved }) =>
      !expanded && saved ? <Fragment>{children}</Fragment> : null
    }
  </Subscriber>
);

export const Outlet = ({ children }) => (
  <Subscriber channel="create-resource-group">
    {({ namespace }) => (
      <Subscriber channel="create-resource-step">
        {({ expanded, next }) =>
          expanded ? children({ next: `/${namespace}/${next}` }) : null
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
      children
    } = this.props;

    return (
      <Broadcast
        channel="create-resource-step"
        value={{ expanded, optional, saved, next, name, isValid }}
      >
        <Card expanded={expanded} error={!expanded && !isValid}>
          <CardOutlet>
            <Padding all={5}>{children}</Padding>
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
