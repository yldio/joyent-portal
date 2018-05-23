import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import titleCase from 'title-case';
import paramCase from 'param-case';
import plur from 'plur';

import {
  H2,
  P,
  Anchor,
  Button,
  Card,
  CardOutlet,
  ExternalIcon
} from 'joyent-ui-toolkit';

export const Title = ({ children, ...props }) => (
  <Margin bottom="3">
    <H2 {...props}>{children}</H2>
  </Margin>
);

export const Content = ({ children, ...props }) => (
  <Margin bottom="2">
    <P {...props}>{children}</P>
  </Margin>
);

export default ({
  children,
  id = '',
  object = 'instance',
  name = 'image',
  altCreateTo,
  ...rest
}) => (
  <Card {...rest}>
    <CardOutlet>
      <Padding all="5">
        {children}
        <P>Where would you like to return to?</P>
        <Margin top="5">
          <Flex alignCenter>
            <FlexItem>
              <Margin right="1">
                <Button
                  to={`/${paramCase(plur(object))}/${id}`}
                  component={Link}
                >
                  View {object}
                </Button>
              </Margin>
            </FlexItem>
            <FlexItem>
              <Margin right="3">
                <Button
                  to={`/${paramCase(plur(object))}`}
                  component={Link}
                  secondary
                >
                  {titleCase(object)} list
                </Button>
              </Margin>
            </FlexItem>
            {altCreateTo ? (
              <Fragment>
                <FlexItem>
                  <Anchor to={altCreateTo} component={Link}>
                    Create {name} from {object}
                  </Anchor>
                </FlexItem>
                <FlexItem>
                  <Margin left="1">
                    <ExternalIcon height="12" width="12" fill="primary" />
                  </Margin>
                </FlexItem>
              </Fragment>
            ) : null}
          </Flex>
        </Margin>
      </Padding>
    </CardOutlet>
  </Card>
);
