import React, { Component, Fragment } from 'react';
import { If, Then } from 'react-if';
import ReduxForm from 'declarative-redux-form';
import { SubmissionError, destroy } from 'redux-form';
import { Margin, Padding } from 'styled-components-spacing';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { set, destroyAll } from 'react-redux-values';
import intercept from 'apr-intercept';
import get from 'lodash.get';

import {
  H3,
  ViewContainer,
  Message,
  MessageTitle,
  MessageDescription,
  Button
} from 'joyent-ui-toolkit';

import {
  PostCreation,
  PostCreationContent,
  PostCreationTitle
} from 'joyent-ui-resource-widgets';

import {
  Name,
  Image,
  Package,
  Networks,
  Tags,
  Metadata,
  UserScript,
  Firewall,
  CNS,
  generatePayload
} from 'joyent-ui-instance-steps';

import { Provider as ResourceSteps } from 'joyent-ui-resource-step';

import { Forms } from '@root/constants';
import parseError from '@state/parse-error';
import ListTemplates from '@graphql/list-templates.gql';
import CreateTemplateMutation from '@graphql/create-template.gql';
import GetTemplate from '@graphql/get-template.gql';

const { TC_F } = Forms;
const names = {
  name: 'TC_NAME',
  image: 'TC_IMAGE',
  package: 'TC_PACKAGE',
  networks: 'TC_NETWORKS',
  tags: 'TC_TAGS',
  metadata: 'TC_METADATA',
  'user-script': 'TC_USERSCRIPT',
  firewall: 'TC_FIREWALL',
  cns: 'TC_CNS'
};

class CreateTemplate extends Component {
  constructor(...args) {
    super(...args);
    this.isValids = {};
  }

  setIsValid = name => ref => {
    if (!ref) {
      return;
    }

    const { isValid } = ref;

    if (!isValid) {
      return;
    }

    this.isValids = Object.assign({}, this.isValids, {
      [name]: isValid
    });
  };

  isFormValid = () => {
    const { steps } = this.props;

    return Boolean(
      Object.keys(this.isValids).filter(name => name =>
        !this.isValids[name](steps[name] || {})
      ).length
    );
  };

  isStepValid = step => {
    const { steps } = this.props;
    const fn = this.isValids[step];
    const values = steps[step];

    if (!fn || !values) {
      return true;
    }

    return fn(values);
  };

  render() {
    const {
      error,
      match,
      steps,
      disabled,
      handleDefocus,
      handleSubmit
    } = this.props;
    const { params } = match;
    const { step } = params;
    const { name, image, networks, tags, metadata, cns, firewall } = steps;

    return (
      <ViewContainer main>
        <Margin top="5">
          <H3>Create Template</H3>
        </Margin>
        <Padding top="5">
          <If condition={error}>
            <Then>
              <Margin bottom="2">
                <Message error>
                  <MessageTitle>Ooops!</MessageTitle>
                  <MessageDescription>
                    <Fragment>{error}</Fragment>
                  </MessageDescription>
                </Message>
              </Margin>
            </Then>
          </If>
          <ResourceSteps namespace="templates/~create">
            <Margin bottom="5">
              <Name
                type="template"
                ref={this.setIsValid('name')}
                expanded={step === 'name'}
                next="image"
                saved={get(steps, 'name.name', false)}
                onDefocus={handleDefocus('name')}
                preview={name}
                isValid={this.isStepValid('name')}
              />
            </Margin>
            <Margin bottom="5">
              <Image
                ref={this.setIsValid('image')}
                expanded={step === 'image'}
                next="package"
                saved={steps.image && steps.image.id}
                onDefocus={handleDefocus('image')}
                preview={image}
              />
            </Margin>
            <Margin bottom="5">
              <Package
                ref={this.setIsValid('package')}
                expanded={step === 'package'}
                next="networks"
                saved={steps.package}
                onDefocus={handleDefocus('package')}
                preview={steps.package}
              />
            </Margin>
            <Margin bottom="5">
              <Networks
                ref={this.setIsValid('networks')}
                expanded={step === 'networks'}
                next="tags"
                saved={steps.networks}
                onDefocus={handleDefocus('networks')}
                preview={networks}
              />
            </Margin>
            <Margin bottom="5">
              <Tags
                ref={this.setIsValid('tags')}
                expanded={step === 'tags'}
                next="metadata"
                saved={steps.tags && steps.tags.length}
                onDefocus={handleDefocus('tags')}
                preview={tags}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <Metadata
                ref={this.setIsValid('metadata')}
                expanded={step === 'metadata'}
                next="user-script"
                saved={steps.metadata && steps.metadata.length}
                onDefocus={handleDefocus('metadata')}
                preview={metadata}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <UserScript
                ref={this.setIsValid('user-script')}
                expanded={step === 'user-script'}
                next="firewall"
                saved={get(steps, 'user-script.lines', false)}
                onDefocus={handleDefocus('user-script')}
                preview={steps['user-script']}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <Firewall
                ref={this.setIsValid('firewall')}
                expanded={step === 'firewall'}
                next="cns"
                saved={steps.firewall}
                onDefocus={handleDefocus('firewall')}
                preview={firewall}
                optional
              />
            </Margin>
            <Margin bottom="5">
              <CNS
                ref={this.setIsValid('cns')}
                expanded={step === 'cns'}
                next=""
                saved={steps.cns}
                onDefocus={handleDefocus('cns')}
                preview={cns}
                optional
              />
            </Margin>
          </ResourceSteps>
          <Margin bottom="5">
            <If condition={error}>
              <Then>
                <Margin bottom="2">
                  <Message error>
                    <MessageTitle>Ooops!</MessageTitle>
                    <MessageDescription>
                      <Fragment>{error}</Fragment>
                    </MessageDescription>
                  </Message>
                </Margin>
              </Then>
            </If>
            <ReduxForm form={TC_F} onSubmit={handleSubmit}>
              {({ handleSubmit, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Button
                    disabled={disabled || !this.isFormValid()}
                    loading={submitting}
                  >
                    Create
                  </Button>
                </form>
              )}
            </ReduxForm>
          </Margin>
        </Padding>
      </ViewContainer>
    );
  }
}

export const Success = ({ match }) => {
  const id = match.params.template;

  return (
    <ViewContainer main>
      <Margin top="5">
        <PostCreation
          id={id}
          altCreateTo={`/service-groups/~create/name?template=${id}`}
          object="template"
          name="service group"
        >
          <PostCreationTitle>
            You have successfully created a template
          </PostCreationTitle>
          <PostCreationContent>
            Your template has been created and is currently being processed. It
            should only take a few minutes and will then appear in your console.
          </PostCreationContent>
        </PostCreation>
      </Margin>
    </ViewContainer>
  );
};

export default compose(
  graphql(CreateTemplateMutation, { name: 'createTemplate' }),
  connect(({ form, values = {} }, { match, location }) => {
    const steps = {
      name: values[names.name],
      image: values[names.image],
      package: values[names.package],
      networks: values[names.networks],
      tags: values[names.tags],
      metadata: values[names.metadata],
      'user-script': values[names['user-script']],
      firewall: values[names.firewall],
      cns: values[names.cns]
    };

    const error = get(form, `${TC_F}.error`, null);

    // Maybe re-use saved to only write the rule once
    const disabled = !(
      !error &&
      steps.name &&
      steps.name.name &&
      steps.image &&
      steps.image.id &&
      steps.package &&
      steps.package.id &&
      Array.isArray(steps.networks)
    );

    return {
      disabled,
      forms: Object.keys(form), // improve this
      error,
      steps
    };
  }),
  connect(null, (dispatch, { steps = {}, forms, history, createTemplate }) => {
    return {
      handleDefocus: name => value => {
        return dispatch(set({ name: names[name], value }));
      },

      handleSubmit: async () => {
        const [err, res] = await intercept(
          createTemplate({
            variables: generatePayload(steps),
            update: (proxy, { data: { createTemplate: template } }) => {
              try {
                proxy.writeQuery({
                  query: ListTemplates,
                  data: {
                    templates: proxy
                      .readQuery({ query: ListTemplates })
                      .templates.concat([template])
                  }
                });
              } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
              }

              try {
                proxy.writeQuery({
                  query: GetTemplate,
                  variables: { id: template.id },
                  data: { template }
                });
              } catch (err) {
                // eslint-disable-next-line no-console
                console.error(err);
              }
            }
          })
        );

        if (err) {
          throw new SubmissionError({
            _error: parseError(err)
          });
        }

        const { data } = res;
        const { createTemplate: ct } = data;
        const { id } = ct;

        dispatch([destroyAll(), forms.map(name => destroy(name))]);
        history.push(`/templates/~create/${id}/success`);
      }
    };
  })
)(CreateTemplate);
