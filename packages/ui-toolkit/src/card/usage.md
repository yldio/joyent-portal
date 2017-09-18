```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card>
  <CardView>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOutlet>Outlet</CardOutlet>
  </CardView>
  <CardOptions />
</Card>
```

#### `collapsed`

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card collapsed>
  <CardView>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOutlet>Outlet</CardOutlet>
  </CardView>
  <CardOptions />
</Card>
```

#### `transparent`
```
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
</Card>
```

```
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
</Card>
```

#### `headed`

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardMeta>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOutlet>Outlet</CardOutlet>
  </CardView>
</Card>
```

#### `headed` and `collapsed`

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card collapsed headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardMeta>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOutlet>Outlet</CardOutlet>
  </CardView>
</Card>
```

#### `stacked`

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card stacked>
  <CardView>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOutlet>Outlet</CardOutlet>
  </CardView>
  <CardOptions />
</Card>
```

#### group

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card headed>
  <CardHeader>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardGroupView>
    <Card flat>
      <CardView>
        <CardMeta>
          <CardTitle>Title</CardTitle>
        </CardMeta>
        <CardOutlet>Outlet</CardOutlet>
      </CardView>
    </Card>
    <Card flat>
      <CardView>
        <CardMeta>
          <CardTitle>Title</CardTitle>
          <CardSubTitle>Subtitle</CardSubTitle>
          <CardDescription>Description</CardDescription>
        </CardMeta>
        <CardOutlet>Outlet</CardOutlet>
      </CardView>
    </Card>
    <Card flat stacked>
      <CardView>
        <CardMeta>
          <CardTitle>Title</CardTitle>
          <CardSubTitle>Subtitle</CardSubTitle>
        </CardMeta>
        <CardOutlet>Outlet</CardOutlet>
      </CardView>
    </Card>
  </CardGroupView>
</Card>
```

#### `disabled`

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card headed disabled>
  <CardHeader>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardView>
    <CardMeta>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOutlet>Outlet</CardOutlet>
  </CardView>
</Card>
```

#### group and `disabled`

```
const {
  CardDescription,
  CardHeader,
  CardMeta,
  CardOptions,
  CardOutlet,
  CardSubTitle,
  CardTitle,
  CardView,
  CardGroupView
} = require('./');

<Card headed disabled>
  <CardHeader>
    <CardMeta>
      <CardTitle>Title</CardTitle>
      <CardSubTitle>Subtitle</CardSubTitle>
      <CardDescription>Description</CardDescription>
    </CardMeta>
    <CardOptions />
  </CardHeader>
  <CardGroupView>
    <Card flat disabled>
      <CardView>
        <CardMeta>
          <CardTitle>Title</CardTitle>
        </CardMeta>
        <CardOutlet>Outlet</CardOutlet>
      </CardView>
    </Card>
    <Card flat disabled>
      <CardView>
        <CardMeta>
          <CardTitle>Title</CardTitle>
          <CardSubTitle>Subtitle</CardSubTitle>
          <CardDescription>Description</CardDescription>
        </CardMeta>
        <CardOutlet>Outlet</CardOutlet>
      </CardView>
    </Card>
    <Card flat stacked disabled>
      <CardView>
        <CardMeta>
          <CardTitle>Title</CardTitle>
          <CardSubTitle>Subtitle</CardSubTitle>
        </CardMeta>
        <CardOutlet>Outlet</CardOutlet>
      </CardView>
    </Card>
  </CardGroupView>
</Card>
```