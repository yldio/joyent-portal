import React from 'react';
import emotion from 'preact-emotion';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import remcalc from 'remcalc';

import { Grid, Row, Col } from 'preact-emotion-flexboxgrid';
import {
  DatacenterPlace,
  DatacenterRegion,
  Datacenter,
  Overlay
} from '../components';

const Container = emotion('div')`
  background-color: #ffffff;
`;

const TitleContainer = emotion('div')`
  background-color: ${props => props.theme.background};
`;

const RegionContainer = emotion('div')`
  padding-top: ${remcalc(18)};
  padding-bottom: ${remcalc(24)};
`;

const GetDatacenters = gql`
  {
    regions @client {
      name
      slug
    }
    places @client {
      name
      slug
      region
    }
    datacenters @client {
      name
      slug
      place
    }
  }
`;

const Datacenters = ({ expanded, regions = [] }) =>
  expanded ? (
    <Overlay>
      {regions.map(({ name, slug, places }) => (
        <div key={slug}>
          <TitleContainer>
            <Grid>
              <Row>
                <Col>
                  <DatacenterRegion>{name}</DatacenterRegion>
                </Col>
              </Row>
            </Grid>
          </TitleContainer>
          <Container>
            <Grid>
              <RegionContainer>
                <Row>
                  {places.map(({ name, slug, datacenters }) => (
                    <Col key={slug} xs={12} md={6} lg={3}>
                      <DatacenterPlace>{name}</DatacenterPlace>
                      {datacenters.map(({ name, slug }) => (
                        <Datacenter key={slug}>{name}</Datacenter>
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
    props: ({ data }) => {
      const {
        regions = [],
        places = [],
        datacenters = [],
        loading = false,
        error = null
      } = data;

      const _regions = regions.map(({ slug, ...region }) => ({
        ...region,
        places: places
          .filter(({ region }) => region === slug)
          .map(({ slug, ...place }) => ({
            ...place,
            datacenters: datacenters.filter(({ place }) => place === slug),
            slug
          })),
        slug
      }));

      return { regions: _regions, loading, error };
    }
  })
)(Datacenters);
