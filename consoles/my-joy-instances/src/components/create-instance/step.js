import React, { Fragment } from 'joy-react-broadcast';
import { Broadcast, Subscriber } from 'joy-react-broadcast';
import { Link } from 'react-router-dom';
import Flex, { FlexItem } from 'styled-flex-component';
import { Margin, Padding } from 'styled-components-spacing';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';

import {
  Card,
  CardOutlet,
  Divider,
  H3,
  P,
  Hr,
  ArrowIcon,
  SavedIcon
} from 'joyent-ui-toolkit';

const Header = ({ slug = '', icon = null, children }) => (
  <Subscriber channel="create-resource-step">
    {({ expanded = false, optional = false, saved = false }) => (
      <Fragment>
        <Flex justifyBetween>
          <FlexItem>
            <Flex alignCenter>
              <FlexItem>{icon}</FlexItem>
              <FlexItem>
                <Divider vertical />
              </FlexItem>
              <FlexItem>
                <H3>{children}</H3>
              </FlexItem>
              <FlexItem>
                <Divider vertical />
              </FlexItem>
              <FlexItem alignCenter>
                <Link to={expanded ? '/instances/~create' : `/${slug}`}>
                  <Flex alignCenter>
                    {expanded ? 'Collase' : 'Expand'}
                    <Margin left={0.5}>
                      <ArrowIcon direction={expanded ? 'up' : 'down'} />
                    </Margin>
                  </Flex>
                </Link>
              </FlexItem>
            </Flex>
          </FlexItem>
          {saved ? (
            <FlexItem>
              <SavedIcon />
            </FlexItem>
          ) : null}
          {/* improve this */}
          {optional ? (
            <FlexItem>
              <P>Optional</P>
            </FlexItem>
          ) : null}
        </Flex>
        {expanded || saved ? (
          <Margin vertical={3}>
            <Hr />
          </Margin>
        ) : null}
      </Fragment>
    )}
  </Subscriber>
);

const Description = ({ href = '', children }) => (
  <Row>
    <Col xs={12} sm={8}>
      <P>
        {children}{' '}
        {href ? (
          <a target="__blank" href={href} rel="noopener noreferrer">
            Read the docs
          </a>
        ) : null}
      </P>
    </Col>
  </Row>
);

export default ({
  expanded = false,
  optional = false,
  saved = false,
  children
}) => (
  <Broadcast
    channel="create-resource-step"
    value={{ expanded, optional, saved }}
  >
    {() => (
      <Card>
        <CardOutlet>
          <Padding all={4}>{children}</Padding>
        </CardOutlet>
      </Card>
    )}
  </Broadcast>
);
