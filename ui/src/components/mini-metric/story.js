const React = require('react');
const Base = require('../base');
const Row = require('../row');
const Column = require('../column');

const {
  storiesOf
} = require('@kadira/storybook');

const {
  MiniMetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MiniMetricView
} = require('./');

const MiniMetricData = require('../list/mini-metric-data');

storiesOf('Metric (Mini)', module)
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
