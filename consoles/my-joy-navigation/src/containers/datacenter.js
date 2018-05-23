import React from 'react';
import emotion from 'preact-emotion';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import remcalc from 'remcalc';
import groupBy from 'lodash.groupby';

import { Grid, Row, Col } from 'preact-emotion-flexboxgrid';

import {
  DatacenterPlace,
  DatacenterRegion,
  Datacenter,
  Overlay,
  Anchor
} from '../components';

const fixContinentName = name =>
  name
    .toLowerCase()
    .split('_')
    .join(' ');

const Container = emotion('div')`
  background-color: #ffffff;
`;

const TitleContainer = emotion('div')`
  background-color: ${props => props.theme.background};
  text-transform:capitalize;
`;

const RegionContainer = emotion('div')`
  padding-top: ${remcalc(18)};
  padding-bottom: ${remcalc(24)};
`;

const GetDatacenters = gql`
  {
    regions {
      name
      continent
      datacenters {
        name
        url
      }
    }
  }
`;

const Datacenters = ({ expanded, regions = [] }) =>
  expanded ? (
    <Overlay>
      {Object.keys(regions).map(region => (
        <div key={region}>
          <TitleContainer>
            <Grid>
              <Row>
                <Col>
                  <DatacenterRegion>
                    {fixContinentName(region)}
                  </DatacenterRegion>
                </Col>
              </Row>
            </Grid>
          </TitleContainer>
          <Container>
            <Grid>
              <RegionContainer>
                <Row>
                  {regions[region].map(({ name, datacenters }) => (
                    <Col key={name} xs="12" md="6" lg="3">
                      <DatacenterPlace>{name}</DatacenterPlace>
                      {datacenters.map(({ name, url }) => (
                        <Datacenter key={name}>
                          <Anchor href={url}>{name}</Anchor>
                        </Datacenter>
                      ))}
                    </Col>
                  ))}
                </Row>
              </RegionContainer>
            </Grid>
          </Container>
        </div>
      ))}
    </Overlay>
  ) : null;

export default compose(
  graphql(GetDatacenters, {
    options: () => ({
      ssr: false
    }),
    props: ({ data: { regions = [], loading = false, error = null } }) => ({
      regions: groupBy(regions, 'continent'),
      loading,
      error
    })
  })
)(Datacenters);
