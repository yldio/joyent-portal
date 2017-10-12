#### Card > Headed > Collapsed

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { InstancesIconLight } = require('../icons');

<Card collapsed headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Nginx</CardTitle>
      <CardDescription>
        <CardInfo
          icon={<InstancesIconLight />}
          iconPosition="left"
          label="4 of 4 instances"
        />
      </CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
</Card>;
```

#### Card > Headed

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Nginx</CardTitle>
      <CardDescription>
        <CardInfo
          icon={<InstancesIconLight />}
          iconPosition="left"
          label="4 of 4 instances"
        />
      </CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardDescription>
      <CardInfo
        icon={<HealthyIcon healthy="HEALTHY" />}
        iconPosition="left"
        label="Healthy"
        color="dark"
      />
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Single state

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Nginx</CardTitle>
      <CardDescription>
        <CardInfo
          icon={<InstancesIconLight />}
          iconPosition="left"
          label="4 of 4 instances"
        />
      </CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardDescription>
      1 instance paused <br />
      1 instances stopped <br />
      1 instance not responding <br />
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Metrics

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { MetricGraph, GraphContainer, GraphTitle } = require('../metrics');
const { Row } = require('react-styled-flexboxgrid');
const metrics = require('./metrics.json');
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Nginx</CardTitle>
      <CardDescription>
        <CardInfo
          icon={<InstancesIconLight />}
          iconPosition="left"
          label="4 of 4 instances"
        />
      </CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardDescription>
      <span>Scaling from 1 to 4: finished</span>
      <CardInfo
        icon={<HealthyIcon />}
        iconPosition="left"
        label="Healthy"
        color="dark"
      />
    </CardDescription>
    <CardDescription>
      <Row>
        <GraphContainer xs={4}>
          <GraphTitle>Memory usage</GraphTitle>
          <MetricGraph metricsData={metrics} graphDurationSeconds={90} />
        </GraphContainer>
        <GraphContainer xs={4}>
          <GraphTitle>CPU usage</GraphTitle>
          <MetricGraph metricsData={metrics} graphDurationSeconds={90} />
        </GraphContainer>
        <GraphContainer xs={4}>
          <GraphTitle>CPU wait time</GraphTitle>
          <MetricGraph metricsData={metrics} graphDurationSeconds={90} />
        </GraphContainer>
      </Row>
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Provisioning

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const StatusLoader = require('../status-loader').default;
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card collapsed headed disabled>
  <CardHeader disabled>
    <CardMeta>
      <CardTitle disabled>
        <span>Nginx</span>
        <StatusLoader inline row msg="Provisioning" />
      </CardTitle>
    </CardMeta>
    <CardOptions disabled />
  </CardHeader>
</Card>;
```

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { MetricGraph, GraphContainer, GraphTitle } = require('../metrics');
const StatusLoader = require('../status-loader').default;
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Nginx</CardTitle>
      <CardDescription>
        <CardInfo
          icon={<InstancesIconLight />}
          iconPosition="left"
          label="4 of 4 instances"
        />
      </CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardDescription>
      <StatusLoader row msg="Provisioning 3 instances" />
      <br />
      <br />
      <br />
      <CardInfo
        icon={<HealthyIcon />}
        iconPosition="left"
        label="Healthy"
        color="dark"
      />
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Disabled

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { InstancesIcon, HealthyIcon } = require('../icons');
const StatusLoader = require('../status-loader').default;

<Card headed disabled>
  <CardHeader disabled>
    <CardMeta>
      <CardTitle disabled>Nginx</CardTitle>
      <CardDescription disabled>
        <CardInfo
          icon={<InstancesIcon />}
          iconPosition="left"
          label="4 of 4 instances"
          color="dark"
        />
      </CardDescription>
    </CardMeta>
    <CardOptions disabled />
  </CardHeader>
  <CardView>
    <CardDescription>
      <StatusLoader row msg="Provisioning 3 instances" />
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Instance

```jsx
const {
  CardDescription,
  CardOutlet,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { MetricGraph, GraphContainer, GraphTitle } = require('../metrics');
const { Row } = require('react-styled-flexboxgrid');
const metrics = require('./metrics.json');
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card>
  <CardView>
    <CardDescription>
      <b>percona_primary</b>
      <CardInfo
        icon={<HealthyIcon />}
        iconPosition="left"
        label="Healthy"
        color="dark"
      />
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Instance > Stacked

```jsx
const {
  CardDescription,
  CardOutlet,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { MetricGraph, GraphContainer, GraphTitle } = require('../metrics');
const { Row } = require('react-styled-flexboxgrid');
const { InstancesIconLight, HealthyIcon } = require('../icons');

<Card stacked>
  <CardView>
    <CardDescription>
      <b>percona_primary</b>
      <span>4 instances</span>
      <CardInfo
        icon={<HealthyIcon />}
        iconPosition="left"
        label="Healthy"
        color="dark"
      />
    </CardDescription>
  </CardView>
</Card>;
```

#### Card > Instance > Group

```jsx
const {
  CardDescription,
  CardOutlet,
  CardTitle,
  CardView,
  CardInfo
} = require('./');
const { MetricGraph, GraphContainer, GraphTitle } = require('../metrics');
const { Row } = require('react-styled-flexboxgrid');
const { InstancesIconLight, HealthyIcon } = require('../icons');

<div>
  <Card>
    <CardView>
      <CardDescription>
        <b>percona_primary</b>
        <CardInfo
          icon={<HealthyIcon />}
          iconPosition="left"
          label="Healthy"
          color="dark"
        />
      </CardDescription>
    </CardView>
  </Card>
  <Card>
    <CardView>
      <CardDescription>
        <b>percona_primary</b>
        <CardInfo
          icon={<HealthyIcon />}
          iconPosition="left"
          label="Healthy"
          color="dark"
        />
      </CardDescription>
    </CardView>
  </Card>
  <Card stacked>
    <CardView>
      <CardDescription>
        <b>percona_primary</b>
        <span>4 instances</span>
        <CardInfo
          icon={<HealthyIcon />}
          iconPosition="left"
          label="Healthy"
          color="dark"
        />
      </CardDescription>
    </CardView>
  </Card>
</div>;
```

#### Card > Instance > List

```jsx
const {
  Card,
  CardInfo,
  CardView,
  CardTitle,
  CardDescription,
  CardOptions
} = require('./');
const { HealthyIcon, DataCenterIcon } = require('../icons');

<Card collapsed>
  <CardView>
    <CardTitle>WordPress_01</CardTitle>
    <CardDescription>
      <CardInfo
        icon={<HealthyIcon healthy="HEALTHY" />}
        iconPosition="left"
        label="Healthy"
        color="dark"
      />
    </CardDescription>
    <CardDescription>
      <CardInfo
        icon={<DataCenterIcon />}
        iconPosition="left"
        label="eu-ams-1"
        color="dark"
      />
    </CardDescription>
    <CardOptions />
  </CardView>
</Card>;
```

#### Card > Secondary

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView,
  CardFooter
} = require('./');

<Card transparent>
  <CardView>
    <CardMeta>
      <CardTitle>$0.016 per hour</CardTitle>
      <CardSubTitle>0.256 GB RAM</CardSubTitle>
      <CardSubTitle>0.25 vCPUs</CardSubTitle>
      <CardSubTitle>0.01 TB disk</CardSubTitle>
      <CardSubTitle>SSD</CardSubTitle>

      <CardFooter>Compute Optimise</CardFooter>
    </CardMeta>
  </CardView>
</Card>;
```

#### Card > Secondary > Active

```jsx
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView,
  CardFooter
} = require('./');

<Card transparent selected>
  <CardView>
    <CardMeta>
      <CardTitle selected>$0.016 per hour</CardTitle>
      <CardSubTitle selected>0.256 GB RAM</CardSubTitle>
      <CardSubTitle selected>0.25 vCPUs</CardSubTitle>
      <CardSubTitle selected>0.01 TB disk</CardSubTitle>
      <CardSubTitle selected>SSD</CardSubTitle>

      <CardFooter selected>Compute Optimise</CardFooter>
    </CardMeta>
  </CardView>
</Card>;
```
