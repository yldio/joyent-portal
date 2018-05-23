import React from 'react';
import emotion from 'preact-emotion';
import { graphql, compose } from 'react-apollo';
import gql from 'graphql-tag';
import remcalc from 'remcalc';

import { Grid, Row, Col } from 'preact-emotion-flexboxgrid';

import {
  ServiceCategory,
  ServiceName,
  ServiceDescription,
  Service,
  Overlay,
  Anchor,
  Sup
} from '../components';

const Container = emotion('div')`
  padding-top: ${remcalc(30)};
  background-color: #ffffff;
`;

const CategoryWrapper = emotion(Col)`
  margin-bottom: ${remcalc(48)};
`;

const sliptTag = tag => tag.split('=').map(n => n.replace(/'/g, ''));

const isNew = tag => sliptTag(tag)[0] === 'is-new';

const formatTag = tag => {
  if (sliptTag(tag)[0] === 'note') {
    return sliptTag(tag)[1];
  }

  if (sliptTag(tag)[0] === 'is-new') {
    return 'New!';
  }

  return tag;
};

const GetProducts = gql`
  {
    categories {
      name
      services {
        name
        slug
        url
        tags
        description
      }
    }
  }
`;

const Services = ({ expanded = false, categories = [], loading }) =>
  expanded ? (
    <Overlay>
      <Container>
        <Grid>
          <Row>
            {!loading &&
              categories.map(({ name, services }) => (
                <CategoryWrapper xs="12" sm="6" md="4">
                  <ServiceCategory>{name}</ServiceCategory>
                  {services.map(({ name, description, url, tags }) => (
                    <Service>
                      <ServiceName>
                        <Anchor href={url}>{name}</Anchor>
                        {tags
                          ? tags.map(tag => (
                              <Sup new={isNew(tag)}>{formatTag(tag)}</Sup>
                            ))
                          : null}
                      </ServiceName>
                      <ServiceDescription>{description}</ServiceDescription>
                    </Service>
                  ))}
                </CategoryWrapper>
              ))}
          </Row>
        </Grid>
      </Container>
    </Overlay>
  ) : null;

export default compose(
  graphql(GetProducts, {
    options: () => ({
      ssr: false
    }),
    props: ({ data: { categories = [], loading = false, error = null } }) => ({
      categories,
      loading,
      error
    })
  })
)(Services);
