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
  RangeSlider,
  Select,
  Tabs,
  Tab,
  Toggle,
  Widget,
  Radio
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

storiesOf('RangeSlider', module)
  .add('Default', () => (
    <RangeSlider />
  ));

storiesOf('Select', module)
  .add('Default', () => (
    <Select label='example select'>
      <option>1</option>
      <option>2</option>
      <option>3</option>
      <option>4</option>
      <option>5</option>
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
