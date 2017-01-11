const React = require('react');
const {
  storiesOf,
  // action,
  // linkTo
} = require('@kadira/storybook');

const {
  Base,
  Button,
  Container,
  Checkbox,
  Row,
  Column,
  AddMetric: {
    AddMetricButton,
    AddMetricDescription,
    AddMetricLink,
    AddMetricTile,
    AddMetricTitle
  },
  Avatar,
  Input,
  List: {
    ListItemDescription,
    ListItemHeader,
    ListItem,
    ListItemMeta,
    ListItemOptions,
    ListItemOutlet,
    ListItemSubTitle,
    ListItemTitle,
    ListItemView,
    ListItemGroupView
  },
  MiniMetric: {
    MiniMetricGraph,
    MiniMetricMeta,
    MiniMetricTitle,
    MiniMetricSubtitle,
    MiniMetricView
  },
  Modal,
  Notificaton,
  Pagination,
  RangeSlider,
  Select,
  SelectCustom,
  Tabs,
  Tab,
  Toggle,
  Tooltip,
  Widget,
  Radio,
  RadioGroup
} = require('../src/');



const seed = require('./seed');
const {
	selectData
} = seed;

const styles = {
  base: {
    backgroundColor: '#FFEBEE'
  },
  row: {
    backgroundColor: '#EF5350'
  },
  column: {
    backgroundColor: '#B71C1C',
    textAlign: 'center',
    color: 'white'
  }
};

storiesOf('Grid', module)
  .add('Row and Column', () => (
    <Base>
      <Container fluid>
        <Row>
          <Column
            md={10}
            sm={9}
            style={styles.base}
            xs={12}
          >
            <Row around style={styles.row}>
              <Column
                lg={4}
                md={3}
                sm={2}
                style={styles.column}
                xs={1}
              >1</Column>
              <Column
                lg={4}
                md={3}
                sm={2}
                style={styles.column}
                xs={1}
              >2</Column>
              <Column
                lg={4}
                md={3}
                sm={2}
                style={styles.column}
                xs={1}
              >3</Column>
            </Row>
          </Column>
        </Row>
      </Container>
    </Base>
  ));

const profile =
  'https://pbs.twimg.com/profile_images/' +
  '641289584580493312/VBfsPlff_400x400.jpg';

storiesOf('Add Metric', module)
  .add('Add Metric', () => (
    <Base>
      <Row>
        <Column>
          <AddMetricTile>
            <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
            <AddMetricDescription>
              CPU usages accross all of the CPU cores.
            </AddMetricDescription>
            <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
            <AddMetricButton>Add</AddMetricButton>
          </AddMetricTile>
        </Column>
      </Row>
    </Base>
  ))
  .add('Added Metric', () => (
    <Base>
      <Row>
        <Column>
          <AddMetricTile>
            <AddMetricTitle>Aggregated CPU usage</AddMetricTitle>
            <AddMetricDescription>
              CPU usages accross all of the CPU cores.
            </AddMetricDescription>
            <AddMetricLink href='http://somelink.com'>Learn more</AddMetricLink>
            <AddMetricButton disabled>Added</AddMetricButton>
          </AddMetricTile>
        </Column>
      </Row>
    </Base>
  ));

storiesOf('Avatar', module)
  .add('Avatar Picture', () => (
    <Avatar
      color='#ef6176'
      name='Tom'
      src={profile}
    />
  ))
  .add('Avatar Text', () => (
    <Base>
      <Avatar
        color='#35a8c0'
        name='Alex'
      />
      <Avatar
        color='#35a8c0'
        name='Thomas'
      />
      <Avatar
        color='#35a8c0'
        name='귀여운 오리'
      />
    </Base>
  ));

storiesOf('Button', module)
  .add('With text', () => (
    <Button>
      Inspire the lazy
    </Button>
  )).add('Secondary', () => (
    <Button secondary>
      Inspire the brave
    </Button>
  )).add('Disabled', () => (
    <Button disabled>
      Inspire the liars
    </Button>
  )).add('Anchor', () => (
    <div>
      <Button href='#'>
        Inspire the anchor
      </Button>
    </div>
  ));

storiesOf('Checkbox', module)
  .add('Default', () => (
    <Checkbox />
  ))
  .add('Checked', () => (
    <Checkbox checked onChange={function noop() {}} />
  ))
  .add('Disabled', () => (
    <Checkbox disabled />
  ));

storiesOf('Radio', module)
  .add('Default', () => (
    <Radio>
     Video killed the radio star
    </Radio>
  ))
  .add('Checked', () => (
    <Radio checked onChange={function noop() {}} />
  ))
  .add('Disabled', () => (
    <Radio disabled />
  ));

storiesOf('Input', module)
  .add('Default', () => (
    <Base>
      <Input placeholder="I am the placeholder" />
    </Base>
  ))
  .add('type=email', () => (
    <Base>
      <Input
        label='Email Address'
        placeholder='Enter email'
        type='email'
      >
        <small>We&apos;ll never share your email with anyone else.</small>
      </Input>
    </Base>
  ));

storiesOf('Modal', module)
  .add('Default', () => (
    <Modal>
      <h2>This is the Modal</h2>
    </Modal>
  ));

storiesOf('Notificaton', module)
  .add('Default', () => (
    <Base>
      <Notificaton>
        <span>This is the default content</span>
      </Notificaton>
    </Base>
  ))
  .add('Success', () => (
    <Base>
      <Notificaton type="success">
        <span>This is the success content</span>
      </Notificaton>
    </Base>
  ))
  .add('Alert', () => (
    <Base>
      <Notificaton type="alert">
        <span>This is the alert content</span>
      </Notificaton>
    </Base>
  ));

storiesOf('Pagination', module)
  .add('Default', () => (
    <Pagination>
      <a>
        <span>&laquo;</span>
        <span>Previous</span>
      </a>
      <a>1</a>
      <a active>2</a>
      <a>3</a>
    </Pagination>
  ));

storiesOf('Radio Group', module)
  .add('Default', () => (
    <RadioGroup>
      <Radio name='hello' value='default'>
       Video killed the radio star
      </Radio>
      <Radio name='hello' value='fancy'>
       Video killed the radio star
      </Radio>
      <Radio name='hello' value='none'>
       Video killed the radio star
      </Radio>
    </RadioGroup>
  ));

storiesOf('RangeSlider', module)
  .add('Default', () => (
    <RangeSlider />
  ));

storiesOf('Select', module)
  .add('Default', () => (
    <Select label='example select'>
      <option>Apple</option>
      <option>Banana</option>
      <option>Pear</option>
      <option>Orange</option>
    </Select>
  ))
  .add('multiple', () => (
    <Select label='example multiple select' multiple>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
    </Select>
  ));

storiesOf('Select Custom', module)
  .add('Default', () => (
    <SelectCustom
      label="This is the label"
      onChange={function noop() {}}
      options={selectData}
    />
  ))
  .add('Multiple', () => (
    <SelectCustom
      label="This is the label"
      multi
      onChange={function noop() {}}
      options={selectData}
    />
  ));

storiesOf('Tabs', module)
  .add('Default', () => (
    <Tabs name='my-tab-group'>
      <Tab title='Containers'>
        <h1>Containers</h1>
      </Tab>
      <Tab title='Users'>
        <h1>User</h1>
      </Tab>
    </Tabs>
  ));

storiesOf('Toggle', module)
  .add('default', () => (
    <Toggle checked />
  ))
  .add('checked', () => (
    <Toggle
      defaultChecked
      options={[
        {
          label: 'Topology',
          checked: true
        },
        {
          label: 'List',
          checked: false
        }
      ]}
    />
  ))
  .add('no props', () => (
    <Toggle />
  ));

storiesOf('Tooltip', module)
  .add('default', () => (
    <Tooltip>
      <li>One</li>
      <li>Two</li>
      <li>Three</li>
    </Tooltip>
  ))
  .add('custom position', () => {
    const arrowPosition = {
      left: '90%',
      bottom: '100%'
    };
    return (
      <Tooltip arrowPosition={arrowPosition}>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
      </Tooltip>
    );
  });

storiesOf('Widget', module)
  .add('single', () => (
    <Widget
      checked
      name='flag'
      selectable='single'
      value='flag_1'
    >
      <img
        alt='england flag'
        // eslint-disable-next-line max-len
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Union_flag_1606_(Kings_Colors).svg/2000px-Union_flag_1606_(Kings_Colors).svg.png'
      />
      <p>Some text</p>
    </Widget>
  ));

const minMetricData = [{
  firstQuartile: 15,
  thirdQuartile: 15,
  median: 15,
  max: 15,
  min: 15,
}, {
  firstQuartile: 26,
  thirdQuartile: 26,
  median: 26,
  max: 26,
  min: 26,
}, {
  firstQuartile: 17,
  thirdQuartile: 17,
  median: 17,
  max: 17,
  min: 17,
}, {
  firstQuartile: 15,
  thirdQuartile: 25,
  median: 19,
  max: 19,
  min: 20,
}, {
  firstQuartile: 19,
  thirdQuartile: 25,
  median: 21,
  max: 20,
  min: 25,
}, {
  firstQuartile: 24,
  thirdQuartile: 30,
  median: 25,
  max: 26,
  min: 27,
}, {
  firstQuartile: 28,
  thirdQuartile: 34,
  median: 30,
  max: 30,
  min: 30,
}, {
  firstQuartile: 30,
  thirdQuartile: 45,
  median: 35,
  max: 40,
  min: 40,
}, {
  firstQuartile: 20,
  thirdQuartile: 55,
  median: 45,
  max: 44,
  min: 44,
}, {
  firstQuartile: 55,
  thirdQuartile: 55,
  median: 55,
  max: 55,
  min: 55,
}, {
  firstQuartile: 57,
  thirdQuartile: 56,
  median: 57,
  max: 58,
  min: 57,
}, {
  firstQuartile: 57,
  thirdQuartile: 56,
  median: 56,
  max: 56,
  min: 56,
}, {
  firstQuartile: 60,
  thirdQuartile: 56,
  median: 60,
  max: 60,
  min: 60,
}, {
  firstQuartile: 57,
  thirdQuartile: 57,
  median: 57,
  max: 57,
  min: 57,
}, {
  firstQuartile: 57,
  thirdQuartile: 55,
  median: 55,
  max: 55,
  min: 55,
}, {
  firstQuartile: 20,
  thirdQuartile: 45,
  median: 45,
  max: 45,
  min: 45,
}, {
  firstQuartile: 15,
  thirdQuartile: 40,
  median: 30,
  max: 49,
  min: 30,
}];

storiesOf('Metrics', module)
  .add('Mini Metric', () => (
    <Base>
      <Row around>
        <Column xs={3}>
          <MiniMetricView>
            <MiniMetricMeta>
              <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
              <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
            </MiniMetricMeta>
            <MiniMetricGraph data={minMetricData} />
          </MiniMetricView>
        </Column>
        <Column xs={3}>
          <MiniMetricView>
            <MiniMetricMeta>
              <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
              <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
            </MiniMetricMeta>
            <MiniMetricGraph data={minMetricData} />
          </MiniMetricView>
        </Column>
        <Column xs={3}>
          <MiniMetricView>
            <MiniMetricMeta>
              <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
              <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
            </MiniMetricMeta>
            <MiniMetricGraph data={minMetricData} />
          </MiniMetricView>
        </Column>
      </Row>
    </Base>
  ));

storiesOf('ListItem', module)
  .add('default', () => (
    <Base>
      <ListItem>
        <ListItemView>
          <ListItemMeta>
            <ListItemTitle>Nginx 01</ListItemTitle>
            <ListItemSubTitle>4 instances</ListItemSubTitle>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOutlet>
            Metrics
          </ListItemOutlet>
        </ListItemView>
        <ListItemOptions>
          …
        </ListItemOptions>
      </ListItem>
    </Base>
  ))
  .add('collapsed', () => (
    <Base>
      <ListItem collapsed>
        <ListItemView>
          <ListItemMeta>
            <ListItemTitle>Nginx 01</ListItemTitle>
            <ListItemSubTitle>4 instances</ListItemSubTitle>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOutlet>
            Metrics
          </ListItemOutlet>
        </ListItemView>
        <ListItemOptions>
          …
        </ListItemOptions>
      </ListItem>
    </Base>
  ))
  .add('headed', () => (
    <Base>
      <ListItem headed>
        <ListItemHeader>
          <ListItemMeta>
            <ListItemTitle>Nginx 01</ListItemTitle>
            <ListItemSubTitle>4 instances</ListItemSubTitle>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOptions>
            …
          </ListItemOptions>
        </ListItemHeader>
        <ListItemView>
          <ListItemMeta>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOutlet>
            Metrics
          </ListItemOutlet>
        </ListItemView>
      </ListItem>
    </Base>
  ))
  .add('headed collapsed', () => (
    <Base>
      <ListItem collapsed headed>
        <ListItemHeader>
          <ListItemMeta>
            <ListItemTitle>Nginx 01</ListItemTitle>
            <ListItemSubTitle>4 instances</ListItemSubTitle>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOptions>
            …
          </ListItemOptions>
        </ListItemHeader>
        <ListItemView>
          <ListItemMeta>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOutlet>
            Metrics
          </ListItemOutlet>
        </ListItemView>
      </ListItem>
    </Base>
  ))
  .add('stacked', () => (
    <Base>
      <ListItem stacked>
        <ListItemView>
          <ListItemMeta>
            <ListItemTitle>Nginx 01</ListItemTitle>
            <ListItemSubTitle>4 instances</ListItemSubTitle>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOutlet>
            Metrics
          </ListItemOutlet>
        </ListItemView>
        <ListItemOptions>
          …
        </ListItemOptions>
      </ListItem>
    </Base>
  ))
  .add('view-group', () => (
    <Base>
      <ListItem headed>
        <ListItemHeader>
          <ListItemMeta>
            <ListItemTitle>Percona</ListItemTitle>
            <ListItemSubTitle>5 instances</ListItemSubTitle>
            <ListItemDescription>Flags</ListItemDescription>
          </ListItemMeta>
          <ListItemOptions>…</ListItemOptions>
        </ListItemHeader>
        <ListItemGroupView>
          <ListItem flat>
            <ListItemView>
              <ListItemMeta>
                <ListItemTitle>percona_database</ListItemTitle>
              </ListItemMeta>
              <ListItemOutlet>
                Metrics
              </ListItemOutlet>
            </ListItemView>
          </ListItem>
          <ListItem flat stacked>
            <ListItemView>
              <ListItemMeta>
                <ListItemTitle>percona_database</ListItemTitle>
                <ListItemSubTitle>5 instances</ListItemSubTitle>
              </ListItemMeta>
              <ListItemOutlet>
                Metrics
              </ListItemOutlet>
            </ListItemView>
          </ListItem>
        </ListItemGroupView>
      </ListItem>
    </Base>
  ));
