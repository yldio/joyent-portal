```jsx
const React = require('react');
const { default: Card } = require('.');

<Card />;
```

#### Card > Shadow

```jsx
const React = require('react');
const { default: Card } = require('.');

<Card shadow />;
```

#### Card > Headed > Collapsed

```jsx
const React = require('react');
const { default: Card, Header, HeaderBox, HeaderMeta } = require('.');
const { Row, Col } = require('react-styled-flexboxgrid');
const { H4, P } = require('../text');

const { InstancesIconLight, IconActionsLight } = require('../icons');

<Card shadow collapsed>
  <Header>
    <HeaderMeta>
      <Row between="xs" middle="xs">
        <Col xs={4} sm={8} md={9}>
          <H4>Nginx</H4>
        </Col>
        <Col xs={8} sm={4} md={3}>
          <P>
            <InstancesIconLight marginRight="0.5" /> 4 of 4 instances
          </P>
        </Col>
      </Row>
    </HeaderMeta>
    <HeaderBox border="left" actionable>
      <IconActionsLight />
    </HeaderBox>
  </Header>
</Card>;
```

#### Card > Headed

```jsx
const React = require('react');
const { default: Card, Header, HeaderBox, HeaderMeta, Outlet } = require('.');
const { Row, Col } = require('react-styled-flexboxgrid');
const { H4, P } = require('../text');

const {
  InstancesIconLight,
  HealthyIcon,
  IconActionsLight
} = require('../icons');

<Card shadow>
  <Header>
    <HeaderMeta>
      <Row between="xs" middle="xs">
        <Col xs={4} sm={8} md={9}>
          <H4>Nginx</H4>
        </Col>
        <Col xs={8} sm={4} md={3}>
          <P>
            <InstancesIconLight marginRight="0.5" /> 4 of 4 instances
          </P>
        </Col>
      </Row>
    </HeaderMeta>
    <HeaderBox border="left" actionable>
      <IconActionsLight />
    </HeaderBox>
  </Header>
  <Outlet>
    <div
      style={{
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'flex-end',
        alignContent: 'stretch',
        alignItems: 'stretch'
      }}
    >
      <P style={{ flex: '1 0 auto', alignSelf: 'flex-end' }}>
        <HealthyIcon width="18" /> Healthy
      </P>
    </div>
  </Outlet>
</Card>;
```

#### Card > Single State

```jsx
const React = require('react');
const { default: Card, Header, HeaderBox, HeaderMeta, Outlet } = require('.');
const { Row, Col } = require('react-styled-flexboxgrid');
const { H4, P, Small } = require('../text');

const { InstancesIconLight, IconActionsLight } = require('../icons');

<Card shadow>
  <Header>
    <HeaderMeta>
      <Row between="xs" middle="xs">
        <Col xs={4} sm={8} md={9}>
          <H4>Nginx</H4>
        </Col>
        <Col xs={8} sm={4} md={3}>
          <P>
            <InstancesIconLight marginRight="0.5" /> 4 of 4 instances
          </P>
        </Col>
      </Row>
    </HeaderMeta>
    <HeaderBox border="left" actionable>
      <IconActionsLight />
    </HeaderBox>
  </Header>
  <Outlet>
    <Small style={{ paddingBottom: '0' }}>1 instance paused</Small>
    <Small style={{ paddingBottom: '0' }}>1 instances stopped</Small>
    <Small style={{ paddingBottom: '0' }}>1 instance not responding</Small>
  </Outlet>
</Card>;
```

#### Card > Provisioning

```jsx
const React = require('react');
const { default: Card, Header, HeaderBox, HeaderMeta, Outlet } = require('.');
const { Row, Col } = require('react-styled-flexboxgrid');
const { H4, P } = require('../text');
const { default: StatusLoader } = require('../status-loader');

const {
  IconActions,
  IconActionsLight,
  InstancesIconLight,
  HealthyIcon
} = require('../icons');

[
  <Row>
    <Col xs={12}>
      <Card collapsed disabled>
        <Header>
          <HeaderMeta>
            <Row middle="xs">
              <Col xs={2} sm={1} md={1}>
                <H4>Nginx</H4>
              </Col>
              <Col xs={8} sm={4} md={2}>
                <StatusLoader marginLeft="0" inline row msg="Provisioning" />
              </Col>
            </Row>
          </HeaderMeta>
          <HeaderBox border="left" actionable>
            <IconActions />
          </HeaderBox>
        </Header>
      </Card>
    </Col>
  </Row>,
  <br />,
  <Row>
    <Col xs={12}>
      <Card shadow>
        <Header>
          <HeaderMeta>
            <Row between="xs" middle="xs">
              <Col xs={4} sm={8} md={9}>
                <H4>Nginx</H4>
              </Col>
              <Col xs={8} sm={4} md={3}>
                <P>
                  <InstancesIconLight marginRight="0.5" /> 4 of 4 instances
                </P>
              </Col>
            </Row>
          </HeaderMeta>
          <HeaderBox border="left" actionable>
            <IconActionsLight />
          </HeaderBox>
        </Header>
        <Outlet>
          <div
            style={{
              display: 'flex',
              flex: '1 0 auto',
              flexDirection: 'column',
              alignSelf: 'stretch',
              justifyContent: 'space-between',
              alignContent: 'stretch',
              alignItems: 'stretch'
            }}
          >
            <div style={{ flex: '0 1 auto', alignSelf: 'flex-start' }}>
              <StatusLoader
                marginLeft="0"
                inline
                row
                msg="Provisioning 3 instances"
              />
            </div>
            <P style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
              <HealthyIcon width="18" /> Healthy
            </P>
          </div>
        </Outlet>
      </Card>
    </Col>
  </Row>
];
```

#### Card > Disabled

```jsx
const React = require('react');
const { default: Card, Header, HeaderBox, HeaderMeta, Outlet } = require('.');
const { Row, Col } = require('react-styled-flexboxgrid');
const { H4, P } = require('../text');
const { IconActions } = require('../icons');

<Card disabled shadow>
  <Header>
    <HeaderMeta>
      <Row between="xs" middle="xs">
        <Col xs={2} sm={9} md={10}>
          <H4>Nginx</H4>
        </Col>
        <Col xs={5} sm={2} md={2}>
          <P>1 Instance</P>
        </Col>
      </Row>
    </HeaderMeta>
    <HeaderBox border="left" actionable>
      <IconActions />
    </HeaderBox>
  </Header>
  <Outlet />
</Card>;
```

#### Card > Instance

```jsx
const React = require('react');
const { default: Card, Outlet } = require('.');
const { H4, P } = require('../text');
const { HealthyIcon } = require('../icons');

<Card>
  <Outlet>
    <div
      style={{
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        alignItems: 'stretch'
      }}
    >
      <div style={{ flex: '0 1 auto', alignSelf: 'flex-start' }}>
        <H4>percona_primary</H4>
      </div>
      <P style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
        <HealthyIcon width="18" /> Healthy
      </P>
    </div>
  </Outlet>
</Card>;
```

#### Card > Instance > Stacked

```jsx
const React = require('react');
const { default: Card, Outlet } = require('.');
const { H4, P } = require('../text');
const { HealthyIcon } = require('../icons');

<Card stacked shadow>
  <Outlet>
    <div
      style={{
        display: 'flex',
        flex: '1 0 auto',
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        alignContent: 'stretch',
        alignItems: 'stretch'
      }}
    >
      <div style={{ flex: '0 1 auto', alignSelf: 'flex-start' }}>
        <H4>percona_primary</H4>
      </div>
      <P style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
        <HealthyIcon width="18" /> Healthy
      </P>
    </div>
  </Outlet>
</Card>;
```

#### Card > Instance > Group

```jsx
const React = require('react');
const { default: Card, Outlet } = require('.');
const { H4, P } = require('../text');
const { HealthyIcon } = require('../icons');

[
  <Card marginBottom="6px">
    <Outlet>
      <div
        style={{
          display: 'flex',
          flex: '1 0 auto',
          flexDirection: 'column',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          alignContent: 'stretch',
          alignItems: 'stretch'
        }}
      >
        <div style={{ flex: '0 1 auto', alignSelf: 'flex-start' }}>
          <H4>percona_secondary</H4>
        </div>
        <P style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
          <HealthyIcon width="18" /> Healthy
        </P>
      </div>
    </Outlet>
  </Card>,
  <Card marginBottom="6px">
    <Outlet>
      <div
        style={{
          display: 'flex',
          flex: '1 0 auto',
          flexDirection: 'column',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          alignContent: 'stretch',
          alignItems: 'stretch'
        }}
      >
        <div style={{ flex: '0 1 auto', alignSelf: 'flex-start' }}>
          <H4>percona_secondary</H4>
        </div>
        <P style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
          <HealthyIcon width="18" /> Healthy
        </P>
      </div>
    </Outlet>
  </Card>,
  <Card shadow stacked>
    <Outlet>
      <div
        style={{
          display: 'flex',
          flex: '1 0 auto',
          flexDirection: 'column',
          alignSelf: 'stretch',
          justifyContent: 'space-between',
          alignContent: 'stretch',
          alignItems: 'stretch'
        }}
      >
        <div style={{ flex: '0 1 auto', alignSelf: 'flex-start' }}>
          <H4>percona_secondary</H4>
        </div>
        <P style={{ flex: '0 1 auto', alignSelf: 'stretch' }}>
          <HealthyIcon width="18" /> Healthy
        </P>
      </div>
    </Outlet>
  </Card>
];
```

#### Card > Instance > List

```jsx
const React = require('react');
const { default: Card, Header, HeaderBox, HeaderMeta } = require('.');
const { Row, Col } = require('react-styled-flexboxgrid');
const { H4, P } = require('../text');
const { HealthyIcon, IconActions, DataCenterIcon } = require('../icons');

[
  <Card collapsed>
    <Header transparent>
      <HeaderMeta>
        <Row between="xs" middle="xs">
          <Col xs={2} sm={9} md={8}>
            <H4>Nginx</H4>
          </Col>
          <Col xs={5} sm={2} md={2}>
            <P>
              <HealthyIcon /> Healthy
            </P>
          </Col>
          <Col xs={5} sm={2} md={2}>
            <P>
              <DataCenterIcon /> eu-ams-1
            </P>
          </Col>
        </Row>
      </HeaderMeta>
      <HeaderBox border="left" actionable>
        <IconActions />
      </HeaderBox>
    </Header>
  </Card>
];
```
