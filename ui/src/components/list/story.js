import { storiesOf } from '@kadira/storybook';
import React from 'react';
import Row from '../row';
import Column from '../column';

import MiniMetricData from './mini-metric-data';

import {
  MiniMetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MiniMetricView
} from '../mini-metric';

import {
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
} from './';

storiesOf('List Item', module)
  .add('default', () => (
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
  ))
  .add('collapsed', () => (
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
  ))
  .add('headed', () => (
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
  ))
  .add('headed collapsed', () => (
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
  ))
  .add('stacked', () => (
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
  ))
  .add('view-group', () => (
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
        <ListItem flat>
          <ListItemView>
            <ListItemMeta>
              <ListItemTitle>percona_database</ListItemTitle>
              <ListItemSubTitle>5 instances</ListItemSubTitle>
              <ListItemDescription>Flags</ListItemDescription>
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
  ))
  .add('view-group with metrics', () => (
    <ListItem headed>
      <ListItemHeader>
        <ListItemMeta md={6} xs={12} >
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
              <Row>
                <Column md={4} xs={12}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
                <Column md={4} xs={12}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
                <Column md={4} xs={12}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
              </Row>
            </ListItemOutlet>
          </ListItemView>
        </ListItem>
        <ListItem flat>
          <ListItemView>
            <ListItemMeta>
              <ListItemTitle>percona_database</ListItemTitle>
              <ListItemSubTitle>5 instances</ListItemSubTitle>
              <ListItemDescription>Flags</ListItemDescription>
            </ListItemMeta>
            <ListItemOutlet>
              <Row>
                <Column xs={4}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
                <Column xs={4}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
                <Column xs={4}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
              </Row>
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
              <Row>
                <Column xs={4}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
                <Column xs={4}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
                <Column xs={4}>
                  <MiniMetricView borderless>
                    <MiniMetricMeta>
                      <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                      <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                    </MiniMetricMeta>
                    <MiniMetricGraph data={MiniMetricData} />
                  </MiniMetricView>
                </Column>
              </Row>
            </ListItemOutlet>
          </ListItemView>
        </ListItem>
      </ListItemGroupView>
    </ListItem>
  ));
