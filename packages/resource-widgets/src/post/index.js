import React from 'react';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import titleCase from 'title-case';
import plur from 'plur';

import { H2, P, Anchor, Button, Card, CardOutlet } from 'joyent-ui-toolkit';

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
                <Button to={`/${plur(object)}/${id}`} component={Link}>
                  View {object}
                </Button>
              </Margin>
            </FlexItem>
            <FlexItem>
              <Margin right="3">
                <Button to={`/${plur(object)}`} component={Link} secondary>
                  {titleCase(object)} list
                </Button>
              </Margin>
            </FlexItem>
            {altCreateTo ? (
              <FlexItem>
                <Anchor to={altCreateTo} component={Link}>
                  Create {name} from {object}
                </Anchor>
              </FlexItem>
            ) : null}
          </Flex>
        </Margin>
      </Padding>
    </CardOutlet>
  </Card>
);
