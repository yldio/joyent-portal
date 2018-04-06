### Basic Card

```jsx
const React = require('react');
const { Margin } = require('styled-components-spacing');
const { default: Card } = require('.');

<Card>
  <Margin top="11" />
</Card>;
```

### Simple Card Header

```jsx
const React = require('react');
const { Margin } = require('styled-components-spacing');
const { default: Card, Header, HeaderBox, HeaderMeta } = require('.');
const { H4 } = require('../text');
const { Actions } = require('../icons');

<Card>
  <Header>
    <HeaderMeta>
      <Margin left="2" rigth="2">
        <H4 white>Nginx</H4>
      </Margin>
    </HeaderMeta>
    <HeaderBox border="left" actionable>
      <Actions light />
    </HeaderBox>
  </Header>
  <Margin top="11" />
</Card>;
```

### Inactive Card

```jsx
const React = require('react');
const { Margin } = require('styled-components-spacing');
const { default: Card, Header, HeaderBox, HeaderMeta } = require('.');
const { H4 } = require('../text');
const { Actions } = require('../icons');

<Card disabled>
  <Header>
    <HeaderMeta>
      <Margin left="2" rigth="2">
        <H4>Nginx</H4>
      </Margin>
    </HeaderMeta>
    <HeaderBox border="left">
      <Actions />
    </HeaderBox>
  </Header>
  <Margin top="11" />
</Card>;
```

### Display-Only Listed Card

```jsx
const React = require('react');
const { Padding, Margin } = require('styled-components-spacing');
const { default: Flex, FlexItem } = require('styled-flex-component');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');
const { default: Card } = require('.');
const { Strong, P } = require('../text');
const { TagList, TagItem } = require('../tags');
const { Fragment } = React;

<Fragment>
  <Margin bottom="2">
    <Card>
      <Padding left="3" right="3" top="1.5" bottom="1.5">
        <Row>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>From: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>All VMs in DC</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>To: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>Any</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>Protocol: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>TCP</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>Ports: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>80;443</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>Action: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>ALLOW</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Padding>
    </Card>
  </Margin>
  <Margin bottom="2">
    <Card>
      <Padding left="3" right="3" top="1.5" bottom="1.5">
        <Row>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>From: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>All VMs in DC</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={3}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>To: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>Any</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>Protocol: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>UDP</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>Ports: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>80;443</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
          <Col xs={2}>
            <Flex justifyStart alignCenter contentStretch full>
              <Margin right="0.5">
                <FlexItem>
                  <Strong>Action: </Strong>
                </FlexItem>
              </Margin>
              <Flex alignCenter>
                <Margin top="0.5" bottom="0.5">
                  <P>ALLOW</P>
                </Margin>
              </Flex>
            </Flex>
          </Col>
        </Row>
      </Padding>
    </Card>
  </Margin>
  <Card>
    <Padding left="3" right="3" top="1.5" bottom="1.5">
      <Row>
        <Col xs={3}>
          <Flex justifyStart alignCenter contentStretch full>
            <Margin right="0.5">
              <FlexItem>
                <Strong>From: </Strong>
              </FlexItem>
            </Margin>
            <Flex alignCenter>
              <TagList>
                <TagItem>wat</TagItem>
              </TagList>
            </Flex>
          </Flex>
        </Col>
        <Col xs={3}>
          <Flex justifyStart alignCenter contentStretch full>
            <Margin right="0.5">
              <FlexItem>
                <Strong>To: </Strong>
              </FlexItem>
            </Margin>
            <Flex alignCenter>
              <Margin top="0.5" bottom="0.5">
                <P>Any</P>
              </Margin>
            </Flex>
          </Flex>
        </Col>
        <Col xs={2}>
          <Flex justifyStart alignCenter contentStretch full>
            <Margin right="0.5">
              <FlexItem>
                <Strong>Protocol: </Strong>
              </FlexItem>
            </Margin>
            <Flex alignCenter>
              <Margin top="0.5" bottom="0.5">
                <P>TCP</P>
              </Margin>
            </Flex>
          </Flex>
        </Col>
        <Col xs={2}>
          <Flex justifyStart alignCenter contentStretch full>
            <Margin right="0.5">
              <FlexItem>
                <Strong>Ports: </Strong>
              </FlexItem>
            </Margin>
            <Flex alignCenter>
              <Margin top="0.5" bottom="0.5">
                <P>80;443</P>
              </Margin>
            </Flex>
          </Flex>
        </Col>
        <Col xs={2}>
          <Flex justifyStart alignCenter contentStretch full>
            <Margin right="0.5">
              <FlexItem>
                <Strong>Action: </Strong>
              </FlexItem>
            </Margin>
            <Flex alignCenter>
              <Margin top="0.5" bottom="0.5">
                <P>ALLOW</P>
              </Margin>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Padding>
  </Card>
</Fragment>;
```

### Select Card

```jsx
const React = require('react');
const { Row, Col } = require('joyent-react-styled-flexboxgrid');
const { default: Card } = require('.');

<Row>
  <Col xs="3">
    <Card preview />
  </Col>
  <Col xs="3">
    <Card preview active />
  </Col>
  <Col xs="3">
    <Card preview disabled />
  </Col>
  <Col xs="3">
    <Card preview error />
  </Col>
</Row>;
```
