import React, { PureComponent } from 'react';
import intercept from 'apr-intercept';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { compose, graphql } from 'react-apollo';
import { connect } from 'react-redux';
import { SubmissionError, destroy } from 'redux-form';
import ReduxForm from 'declarative-redux-form';
import { set, destroy as destroyValue } from 'react-redux-values';
import { Margin, Padding } from 'styled-components-spacing';
import find from 'lodash.find';
import isBoolean from 'lodash.isboolean';
import isArray from 'lodash.isarray';
import get from 'lodash.get';

import {
  Card,
  CardOutlet,
  ViewContainer,
  StatusLoader,
  Message,
  MessageTitle,
  MessageDescription
} from 'joyent-ui-toolkit';

import {
  Cns,
  CnsFooter as Footer,
  CnsAddServiceForm as AddServiceForm
} from 'joyent-ui-resource-widgets';

import Description from '@components/instances/description';
import GetAccount from '@graphql/get-account.gql';
import DeleteTag from '@graphql/delete-tag.gql';
import UpdateTags from '@graphql/update-tags.gql';
import GetTags from '@graphql/list-tags.gql';
import parseError from '@state/parse-error';
import { addCnsService as validateServiceName } from '@state/validators';

const FORM_NAME = 'cns-new-service';

const CnsContainer = ({
  services = [],
  hostnames = [],
  disabled = false,
  handleToggleCnsEnabled,
  handleAddService,
  handleRemoveService,
  mutating = false,
  loading = false,
  mutationError = false,
  loadingError = null,
  shouldAsyncValidate,
  handleAsyncValidate
}) => (
  <ViewContainer main>
    <Margin bottom="3">
      <Description href="https://docs.joyent.com/private-cloud/install/cns">
        Triton CNS is used to automatically update hostnames for your instances.
        You can serve multiple instances (with multiple IP addresses) under the
        same hostname by matching the CNS service names.
      </Description>
    </Margin>
    <Row>
      <Col xs="12" sm="12" md="9">
        <Card>
          <CardOutlet>
            <Padding all="5">
              {loading ? <StatusLoader /> : null}
              {!loading && loadingError ? (
                <Margin bottom="5">
                  <Message error>
                    <MessageTitle>Ooops!</MessageTitle>
                    <MessageDescription>
                      An error occurred while loading your CNS services
                    </MessageDescription>
                  </Message>
                </Margin>
              ) : null}
              {!loading && mutationError ? (
                <Margin bottom="5">
                  <Message error>
                    <MessageTitle>Ooops!</MessageTitle>
                    <MessageDescription>{mutationError}</MessageDescription>
                  </Message>
                </Margin>
              ) : null}
              {!loading && !disabled ? (
                <Cns
                  copy
                  services={services}
                  hostnames={hostnames}
                  onRemoveService={
                    !mutating && (name => handleRemoveService(name, services))
                  }
                >
                  <ReduxForm
                    form={FORM_NAME}
                    destroyOnUnmount={false}
                    forceUnregisterOnUnmount={true}
                    onSubmit={val => handleAddService(val, services)}
                    shouldAsyncValidate={shouldAsyncValidate}
                    asyncValidate={handleAsyncValidate}
                  >
                    {props => <AddServiceForm {...props} disabled={mutating} />}
                  </ReduxForm>
                </Cns>
              ) : null}
            </Padding>
          </CardOutlet>
        </Card>
        {!loading && !loadingError ? (
          <Margin top="5">
            <Footer
              enabled={!disabled}
              submitting={mutating}
              onToggle={() => handleToggleCnsEnabled(!disabled)}
            />
          </Margin>
        ) : null}
      </Col>
    </Row>
  </ViewContainer>
);

export { CnsContainer as Cns };

class CnsClass extends PureComponent {
  componentWillMount() {
    const { reset = () => null } = this.props;
    reset();
  }

  render() {
    const { reset, children, ...rest } = this.props;
    return <CnsContainer {...rest}>{children}</CnsContainer>;
  }
}

export default compose(
  graphql(UpdateTags, { name: 'updateTags' }),
  graphql(DeleteTag, { name: 'deleteTag' }),
  graphql(GetAccount, {
    options: () => ({
      ssr: false
    }),
    props: ({ data }) => {
      const id = get(data, 'account.id', '<account-id>');
      const datacenter = get(data, 'datacenter.name', '<dc>');

      return {
        id,
        datacenter
      };
    }
  }),
  graphql(GetTags, {
    options: ({ match }) => ({
      ssr: false,
      variables: {
        fetchPolicy: 'network-only',
        id: get(match, 'params.instance')
      }
    }),
    props: ({ data }) => {
      const { loading, error, machine, refetch } = data;
      const tags = get(machine, 'tags', []);

      return {
        tags,
        instance: machine,
        loading,
        loadingError: error,
        refetch
      };
    }
  }),
  connect(
    ({ values, form }, { id, datacenter, instance = {}, tags = [] }) => {
      const { name = '<instance-name>' } = instance;

      const cnsDisable = find(tags, ['name', 'triton.cns.disable']) || {};
      const cnsServices = find(tags, ['name', 'triton.cns.services']) || {};

      let disabled = JSON.parse(cnsDisable.value || 'false');
      let services = (cnsServices.value || '').split(/,/gi).filter(Boolean);

      const adding = get(form, `${FORM_NAME}.submitting`, false);
      const toggling = get(values, `cns-${instance.id}-toggling`, false);
      const removing = get(values, `cns-${instance.id}-removing`, false);
      const enabled = get(values, `cns-${instance.id}-enabled`, undefined);
      const svcs = get(values, `cns-${instance.id}-svcs`, undefined);

      const togglingError = get(
        values,
        `cns-${instance.id}-toggling-error`,
        null
      );

      const removingError = get(
        values,
        `cns-${instance.id}-removing-error`,
        null
      );

      if (isBoolean(enabled)) {
        disabled = !enabled;
      }

      if (isArray(svcs)) {
        services = svcs;
      }

      const defaultHostnames = [
        {
          values: [`${name}.inst.${id}.${datacenter}.triton.zone`],
          public: true
        },
        {
          values: [`${name}.inst.${id}.${datacenter}.cns.joyent.com`]
        },
        {
          values: [],
          public: true,
          service: true
        },
        {
          values: [],
          service: true
        }
      ];

      const hostnames = defaultHostnames.map(hostname => {
        if (!hostname.service) {
          return hostname;
        }

        return {
          ...hostname,
          values: services.map(name => {
            const postfix = hostname.public
              ? '.triton.zone'
              : '.cns.joyent.com';
            return `${name}.svc.${id}.${datacenter}${postfix}`;
          })
        };
      });

      return {
        hostnames,
        disabled,
        services,
        mutating: toggling || removing || adding,
        mutationError: togglingError || removingError
      };
    },
    (dispatch, { instance = {}, refetch, updateTags, deleteTag }) => ({
      reset: () => {
        dispatch([
          destroyValue({ name: `cns-${instance.id}-removing` }),
          destroyValue({ name: `cns-${instance.id}-svcs` }),
          destroyValue({ name: `cns-${instance.id}-removing-error` }),
          destroyValue({ name: `cns-${instance.id}-toggling` }),
          destroyValue({ name: `cns-${instance.id}-enabled` }),
          destroyValue({ name: `cns-${instance.id}-toggling-error` })
        ]);

        return refetch();
      },
      shouldAsyncValidate: ({ trigger }) => {
        return trigger === 'change';
      },
      handleAsyncValidate: validateServiceName,
      handleRemoveService: async (name, services) => {
        const value = services.filter(svc => name !== svc);

        dispatch([
          set({ name: `cns-${instance.id}-removing`, value: true }),
          set({ name: `cns-${instance.id}-svcs`, value })
        ]);

        const newValue = value.join(',');
        const mutation = newValue.length
          ? updateTags({
              variables: {
                id: instance.id,
                tags: [
                  {
                    name: 'triton.cns.services',
                    value: value.join(',')
                  }
                ]
              }
            })
          : deleteTag({
              variables: {
                id: instance.id,
                name: 'triton.cns.services'
              }
            });

        const [err] = await intercept(mutation);

        const setLoadingFalse = set({
          name: `cns-${instance.id}-removing`,
          value: false
        });

        if (err) {
          return dispatch([
            setLoadingFalse,
            set({
              name: `cns-${instance.id}-removing-error`,
              value: parseError(err)
            }),
            set({ name: `cns-${instance.id}-svcs`, value: null })
          ]);
        }

        return dispatch(setLoadingFalse);
      },
      handleToggleCnsEnabled: async disabled => {
        dispatch([
          set({ name: `cns-${instance.id}-toggling`, value: true }),
          set({ name: `cns-${instance.id}-enabled`, value: !disabled })
        ]);

        const [err] = await intercept(
          updateTags({
            variables: {
              id: instance.id,
              tags: [
                {
                  name: 'triton.cns.disable',
                  value: disabled ? 'true' : 'false'
                }
              ]
            }
          })
        );

        const setLoadingFalse = set({
          name: `cns-${instance.id}-toggling`,
          value: false
        });

        if (err) {
          return dispatch([
            setLoadingFalse,
            set({
              name: `cns-${instance.id}-toggling-error`,
              value: parseError(err)
            }),
            set({ name: `cns-${instance.id}-enabled`, value: null })
          ]);
        }

        return dispatch(setLoadingFalse);
      },
      handleAddService: async ({ name }, services) => {
        const value = services.concat(name);

        dispatch(set({ name: `cns-${instance.id}-svcs`, value }));

        const [err] = await intercept(
          updateTags({
            variables: {
              id: instance.id,
              tags: [
                {
                  name: 'triton.cns.services',
                  value: value.join(',')
                }
              ]
            }
          })
        );

        if (err) {
          dispatch(set({ name: `cns-${instance.id}-svcs`, services }));

          throw new SubmissionError({
            _error: parseError(err)
          });
        }

        return dispatch(destroy(FORM_NAME));
      }
    })
  )
)(CnsClass);
