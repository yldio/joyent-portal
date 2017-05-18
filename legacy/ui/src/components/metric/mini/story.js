import { storiesOf } from '@kadira/storybook';
import MetricData from '../metric-data';
import Row from '../../row';
import Column from '../../column';
import React from 'react';

import {
  MetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MetricView
}  from '../';

storiesOf('Metric (Mini)', module)
  .add('Mini Metric', () => (
    <Row around>
      <Column xs={3}>
        <MetricView mini>
          <MiniMetricMeta>
            <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
            <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
          </MiniMetricMeta>
          <MetricGraph
            data={MetricData}
            width={160}
            height={72}
          />
        </MetricView>
      </Column>
      <Column xs={3}>
        <MetricView mini>
          <MiniMetricMeta>
            <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
            <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
          </MiniMetricMeta>
          <MetricGraph
            data={MetricData}
            width={160}
            height={72}
          />
        </MetricView>
      </Column>
      <Column xs={3}>
        <MetricView mini>
          <MiniMetricMeta>
            <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
            <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
          </MiniMetricMeta>
          <MetricGraph
            data={MetricData}
            width={160}
            height={72}
          />
        </MetricView>
      </Column>
    </Row>
  ));
