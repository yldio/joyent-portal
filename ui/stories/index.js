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
  Avatar,
  Input,
  Modal,
  Notificaton,
  Pagination,
  RangeSlider,
  Select,
  Tabs,
  Tab,
  Toggle,
  Widget,
  Radio,
  RadioGroup
} = require('../src/');

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
    <Input placeholder="I am the placeholder" />
  ))
  .add('type=email', () => (
    <Input
      label='Email Address'
      placeholder='Enter email'
      type='email'
    >
      <small>We&apos;ll never share your email with anyone else.</small>
    </Input>
  ));

storiesOf('Modal', module)
  .add('Default', () => (
    <Modal>
      <h2>This is the Modal</h2>
    </Modal>
  ));

storiesOf('Notificaton', module)
  .add('Default', () => (
    <Notificaton>
      <span>This is the default content</span>
    </Notificaton>
  ))
  .add('warning', () => (
    <Notificaton type='warning'>
      <span>This is the warning content</span>
    </Notificaton>
  ))
  .add('alert', () => (
    <Notificaton type='alert'>
      <span>This is the alert content</span>
    </Notificaton>
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
  .add('checked', () => (
    <Toggle checked />
  ))
  .add('unchecked', () => (
    <Toggle checked={false} />
  ))
  .add('defaultChecked', () => (
    <Toggle defaultChecked />
  ))
  .add('no props', () => (
    <Toggle />
  ));

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
