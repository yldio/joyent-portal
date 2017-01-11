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
  AddMetric: {
    AddMetricButton,
    AddMetricDescription,
    AddMetricLink,
    AddMetricTile,
    AddMetricTitle
  },
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
                      <MiniMetricGraph data={minMetricData} />
                    </MiniMetricView>
                  </Column>
                  <Column xs={4}>
                    <MiniMetricView borderless>
                      <MiniMetricMeta>
                        <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                        <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                      </MiniMetricMeta>
                      <MiniMetricGraph data={minMetricData} />
                    </MiniMetricView>
                  </Column>
                  <Column xs={4}>
                    <MiniMetricView borderless>
                      <MiniMetricMeta>
                        <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                        <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                      </MiniMetricMeta>
                      <MiniMetricGraph data={minMetricData} />
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
                      <MiniMetricGraph data={minMetricData} />
                    </MiniMetricView>
                  </Column>
                  <Column xs={4}>
                    <MiniMetricView borderless>
                      <MiniMetricMeta>
                        <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                        <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                      </MiniMetricMeta>
                      <MiniMetricGraph data={minMetricData} />
                    </MiniMetricView>
                  </Column>
                  <Column xs={4}>
                    <MiniMetricView borderless>
                      <MiniMetricMeta>
                        <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                        <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                      </MiniMetricMeta>
                      <MiniMetricGraph data={minMetricData} />
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
                      <MiniMetricGraph data={minMetricData} />
                    </MiniMetricView>
                  </Column>
                  <Column xs={4}>
                    <MiniMetricView borderless>
                      <MiniMetricMeta>
                        <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                        <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                      </MiniMetricMeta>
                      <MiniMetricGraph data={minMetricData} />
                    </MiniMetricView>
                  </Column>
                  <Column xs={4}>
                    <MiniMetricView borderless>
                      <MiniMetricMeta>
                        <MiniMetricTitle>Memory: 54%</MiniMetricTitle>
                        <MiniMetricSubtitle>(1280/3000 MB)</MiniMetricSubtitle>
                      </MiniMetricMeta>
                      <MiniMetricGraph data={minMetricData} />
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
