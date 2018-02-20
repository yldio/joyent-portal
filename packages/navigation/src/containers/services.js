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

const GetCategories = gql`
  {
    categories @client {
      name
      slug
    }
  }
`;

const GetProducts = gql`
  {
    products {
      name
      description
      category
      url
    }
  }
`;

const Services = ({ expanded = false, categories = [], products = [] }) =>
  expanded ? (
    <Overlay>
      <Container>
        <Grid>
          {chunk(
            categories.map(({ slug, ...category }) => ({
              ...category,
              services: products.filter(({ category }) => category === slug),
              slug
            })),
            4
          ).map(chunk => (
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
  ) : null;

export default compose(
  graphql(GetCategories, {
    options: () => ({
      ssr: false
    }),
    props: ({ data }) => {
      const { categories = [] } = data;
      return { categories };
    }
  }),
  graphql(GetProducts, {
    options: () => ({
      ssr: false
    }),
    props: ({ data }) => {
      const { products = [] } = data;
      return { products };
    }
  })
)(Services);
