import React from 'react';
import { Margin } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';

import { ViewContainer } from 'joyent-ui-toolkit';

import { Toolbar } from '@components/toolbar';
import TemplatesList, { Item as TemplatesItem } from '@components/list';
import ListTemplates from '@graphql/list-templates.gql';

const Templates = ({ templates = [] }) => (
  <ViewContainer main>
    <Margin top="5">
      <Margin bottom={3}>
        <Toolbar
          searchLabel="Filter templates"
          actionLabel="Create Template"
          actionTo="/templates/~create"
        />
      </Margin>
      <TemplatesList>
        {templates.map(({ id, ...template }) => (
          <TemplatesItem key={id} id={id} {...template} />
        ))}
      </TemplatesList>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(ListTemplates, {
    options: ({ location }) => ({
      ssr: false,
      pollInterval: 1000
    }),
    props: ({ data }) => data
  })
)(Templates);
