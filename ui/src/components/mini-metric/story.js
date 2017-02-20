import { storiesOf } from '@kadira/storybook';
import MiniMetricData from '../list/mini-metric-data';
import Row from '../row';
import Column from '../column';
import React from 'react';

import {
  MiniMetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MiniMetricView
}  from './';

storiesOf('Metric (Mini)', module)
  .add('Mini Metric', () => (
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
  ));
