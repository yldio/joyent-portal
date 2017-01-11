const React = require('react');
const {
  storiesOf,
  // action,
  // linkTo
} = require('@kadira/storybook');

const {
  Base,
  Container,
  Row,
  Column,
  MiniMetric: {
    MiniMetricGraph,
    MiniMetricMeta,
    MiniMetricTitle,
    MiniMetricSubtitle,
    MiniMetricView
  },
} = require('../src/');

const MiniMetricData = require('../src/components/list/mini-metric-data');

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
            <MiniMetricGraph data={MiniMetricData} />
          </MiniMetricView>
        </Column>
        <Column xs={3}>
          <MiniMetricView>
            <MiniMetricMeta>
              <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
              <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
            </MiniMetricMeta>
            <MiniMetricGraph data={MiniMetricData} />
          </MiniMetricView>
        </Column>
        <Column xs={3}>
          <MiniMetricView>
            <MiniMetricMeta>
              <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
              <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
            </MiniMetricMeta>
            <MiniMetricGraph data={MiniMetricData} />
          </MiniMetricView>
        </Column>
      </Row>
    </Base>
  ));


