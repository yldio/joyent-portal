import React, { Fragment, Component } from 'react';
import { If, Then, Else } from 'react-if';
import ReduxForm from 'declarative-redux-form';
import { connect } from 'react-redux';
import { set } from 'react-redux-values';
import { Field } from 'redux-form';
import { compose, graphql } from 'react-apollo';
import { Link } from 'react-router-dom';
import { Margin, Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import get from 'lodash.get';
import sort from 'lodash.sortby';
import reverse from 'lodash.reverse';
import find from 'lodash.find';
import Fuse from 'fuse.js';

import Step, {
  Header as StepHeader,
  Description as StepDescription,
  Preview as StepPreview,
  Outlet as StepOutlet
} from 'joyent-ui-resource-step';

import {
  H2,
  Label,
  Divider,
  Button,
  FormGroup,
  FormLabel,
  Input,
  TemplateIcon,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import TemplatesList, {
  Item as TemplatesItem,
  EmptyCard as TemplatesEmptyCard,
  EmptyRow as TemplatesEmptyRow,
  LoadingRow
} from '@components/templates';

import { Global } from '@state/global.js';
import GetTemplate from '@graphql/get-template.gql';
import ListTemplates from '@graphql/list-templates.gql';
import { Forms, Values } from '@root/constants';

const { SGC_T_F, SGC_F_F } = Forms;
const { SGC_T_SB_V, SGC_T_SO_V } = Values;

class Template extends Component {
  getSnapshotBeforeUpdate(prevProps, prevState) {
    const { preview: prev } = prevProps;
    const { preview: next, onDefocus, readOnly } = this.props;

    if (!(readOnly && prev !== next && onDefocus)) {
      return;
    }

    onDefocus(next);
  }

  render() {
    const {
      loading = false,
      empty = false,
      handleGetValue,
      preview = {},
      initialValues,
      templates = [],
      filter = '',
      sortBy = 'name',
      sortOrder = 'asc',
      expanded = false,
      readOnly = false,
      error = null,
      handleSortBy,
      ...props
    } = this.props;

    return (
      <Step
        name="template"
        getValue={handleGetValue}
        readOnly={readOnly}
        expanded={readOnly ? false : expanded}
        {...props}
      >
        <StepHeader icon={<TemplateIcon />}>Select template</StepHeader>
        <StepDescription>
          Select the template you’d like to deloy your instances from. Once a
          Service Group is deployed with a templates, any changes to that
          template will not effect the acting service group.
        </StepDescription>
        <StepPreview>
          <Margin top="5">
            <If condition={loading && !preview.name}>
              <Then>
                <StatusLoader />
              </Then>
              <Else>
                <Fragment>
                  <Margin bottom="2">
                    <H2>{preview.name}</H2>
                  </Margin>
                  <Flex alignCenter>
                    <FlexItem>
                      <Padding right="3">
                        <Label inline>{preview.image}</Label>
                      </Padding>
                    </FlexItem>
                    <Divider vertical />
                    <FlexItem>
                      <Padding right="3" left="3">
                        <Label inline>{preview.package}</Label>
                      </Padding>
                    </FlexItem>
                    <Divider vertical />
                    <FlexItem>
                      <Padding right="3" left="3">
                        <Label inline>
                          {distanceInWordsToNow(preview.created)}
                        </Label>
                      </Padding>
                    </FlexItem>
                  </Flex>
                </Fragment>
              </Else>
            </If>
          </Margin>
        </StepPreview>
        <StepOutlet>
          {({ next }) => (
            <Margin top="5">
              <If condition={error}>
                <Then>
                  <Margin bottom="3">
                    <Message error>
                      <MessageTitle>Ooops!</MessageTitle>
                      <MessageDescription>
                        An error occurred while loading your templates
                      </MessageDescription>
                    </Message>
                  </Margin>
                </Then>
              </If>
              <ReduxForm form={SGC_F_F}>
                {props => (
                  <If condition={empty}>
                    <Else>
                      <Margin bottom="3">
                        <FormGroup name="filter" field={Field}>
                          <FormLabel>Filter</FormLabel>
                          <Margin top="0.5">
                            <Input disabled={!(filter || templates.length)} />
                          </Margin>
                        </FormGroup>
                      </Margin>
                    </Else>
                  </If>
                )}
              </ReduxForm>
              <ReduxForm form={SGC_T_F} initialValues={initialValues}>
                {({ pristine }) => (
                  <Fragment>
                    <If condition={empty}>
                      <Then>
                        <TemplatesEmptyCard />
                      </Then>
                      <Else>
                        <TemplatesList
                          {...props}
                          sortBy={sortBy}
                          sortOrder={sortOrder}
                          onSortBy={newSortBy =>
                            handleSortBy(newSortBy, { sortOrder, sortBy })
                          }
                        >
                          <If condition={templates.length}>
                            <Then>
                              <Fragment>
                                {templates.map(({ id, ...template }) => (
                                  <TemplatesItem
                                    key={id}
                                    id={id}
                                    {...template}
                                  />
                                ))}
                              </Fragment>
                            </Then>
                            <Else>
                              <If condition={loading}>
                                <Then>
                                  <LoadingRow />
                                </Then>
                                <Else>
                                  <TemplatesEmptyRow />
                                </Else>
                              </If>
                            </Else>
                          </If>
                        </TemplatesList>
                      </Else>
                    </If>
                    <Margin top="5">
                      <Button
                        type="button"
                        disabled={pristine}
                        component={Link}
                        to={next}
                      >
                        Save
                      </Button>
                    </Margin>
                  </Fragment>
                )}
              </ReduxForm>
            </Margin>
          )}
        </StepOutlet>
      </Step>
    );
  }
}

export default compose(
  graphql(ListTemplates, {
    options: ({ location }) => {
      const tmpl = Global().query.template;

      return {
        ssr: true,
        fetchPolicy: tmpl ? 'cache-only' : 'cache-and-network'
      };
    },
    props: ({ data: { error, templates = [], networkStatus } }) => ({
      error,
      loading: networkStatus === 1,
      templates,
      index: new Fuse(templates, {
        keys: ['id', 'name', 'created']
      })
    })
  }),
  graphql(GetTemplate, {
    options: ({ match }) => {
      const tmpl = Global().query.template;

      return {
        ssr: true,
        fetchPolicy: tmpl ? 'cache-and-network' : 'cache-only',
        variables: {
          id: tmpl
        }
      };
    },
    props: ({ data }) => {
      const { variables, networkStatus, error, template } = data;

      if (!variables.id) {
        return {};
      }

      return {
        readOnly: Boolean(variables.id),
        loading: networkStatus === 1,
        error,
        preview: template
      };
    }
  }),
  connect(
    (state, ownProps) => {
      const { form, values: flags } = state;
      const { templates: items, preview = {}, loading, index } = ownProps;

      const filter = get(form, `${SGC_F_F}.values.filter`, '');
      const sortBy = get(flags, SGC_T_SB_V, 'name');
      const sortOrder = get(flags, SGC_T_SO_V, 'asc');

      const templates = sort(filter.length ? index.search(filter) : items, [
        sortBy
      ]);

      return {
        filter,
        empty: !filter && !loading && !templates.length,
        handleGetValue: () => {
          return find(templates, [
            'id',
            get(form, `${SGC_T_F}.values.template`)
          ]);
        },
        initialValues: {
          template: preview.id
        },
        templates: sortOrder === 'asc' ? templates : reverse(templates),
        sortBy,
        sortOrder
      };
    },
    (dispatch, { templates = [], refetch, removeGroup }) => {
      return {
        handleSortBy: (newSortBy, { sortBy: currentSortBy, sortOrder }) => {
          // sort prop is the same, toggle
          if (currentSortBy === newSortBy) {
            return dispatch(
              set({
                name: SGC_T_SO_V,
                value: sortOrder === 'desc' ? 'asc' : 'desc'
              })
            );
          }

          dispatch([
            set({
              name: SGC_T_SO_V,
              value: 'desc'
            }),
            set({
              name: SGC_T_SB_V,
              value: newSortBy
            })
          ]);
        }
      };
    }
  )
)(Template);
