const React = require('react');

const {
  storiesOf
} = require('@kadira/storybook');

const Base = require('../base');
const Row = require('../row');
const Column = require('../column');
const MiniMetricData = require('./mini-metric-data');

const {
  MiniMetricGraph,
  MiniMetricMeta,
  MiniMetricTitle,
  MiniMetricSubtitle,
  MiniMetricView
} = require('../mini-metric');

const {
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
} = require('./');

storiesOf('List Item', module)
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
    </Base>
  ))
  .add('view-group with metrics', () => (
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
    </Base>
  ));