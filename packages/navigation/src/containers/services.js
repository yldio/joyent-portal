import React from 'react';
import emotion from 'preact-emotion';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import chunk from 'lodash.chunk';
import remcalc from 'remcalc';

import { Grid, Row, Col } from 'preact-emotion-flexboxgrid';

import {
  ServiceCategory,
  ServiceName,
  ServiceDescription,
  Service,
  Overlay
} from '../components';

const Container = emotion('div')`
  padding-top: ${remcalc(30)};
  background-color: #ffffff;
`;

const getHeader = gql`
  {
    categories @client {
      name
      slug
    }
    services @client {
      name
      description
      category
      slug
    }
  }
`;

const Services = ({ categories = [] }) => (
  <Overlay>
    <Container>
      <Grid>
        {chunk(categories, 4).map(chunk => (
          <Row>
            {chunk.map(({ name, services }) => (
              <Col xs={12} sm={6} md={4} lg={3}>
                <ServiceCategory>{name}</ServiceCategory>
                {services.map(({ name, description }) => (
                  <Service>
                    <ServiceName>{name}</ServiceName>
                    <ServiceDescription>{description}</ServiceDescription>
                  </Service>
                ))}
              </Col>
            ))}
          </Row>
        ))}
      </Grid>
    </Container>
  </Overlay>
);

export default compose(
  graphql(getHeader, {
    props: ({ data }) => {
      const {
        categories = [],
        services = [],
        loading = false,
        error = null
      } = data;

      const _categories = categories.map(({ slug, ...category }) => ({
        ...category,
        services: services.filter(({ category }) => category === slug),
        slug
      }));

      return { categories: _categories, loading, error };
    }
  })
)(Services);
