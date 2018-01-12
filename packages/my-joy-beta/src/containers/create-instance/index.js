import React from 'react';
import { Margin } from 'styled-components-spacing';
import ReduxForm from 'declarative-redux-form';
import { stopSubmit, destroy } from 'redux-form';
import remcalc from 'remcalc';
import { connect } from 'react-redux';
import { graphql, compose } from 'react-apollo';
import intercept from 'apr-intercept';
import constantCase from 'constant-case';
import get from 'lodash.get';
import omit from 'lodash.omit';
import uniqBy from 'lodash.uniqby';

import { ViewContainer, H2, Button, Divider } from 'joyent-ui-toolkit';

import Name from '@containers/create-instance/name';
import Image from '@containers/create-instance/image';
import Package from '@containers/create-instance/package';
import Tags from '@containers/create-instance/tags';
import Metadata from '@containers/create-instance/metadata';
import Networks from '@containers/create-instance/networks';
import Firewall from '@containers/create-instance/firewall';
import CNS from '@containers/create-instance/cns';
import Affinity from '@containers/create-instance/affinity';
import CreateInstanceMutation from '@graphql/create-instance.gql';
import parseError from '@state/parse-error';

const CreateInstance = ({ step, handleSubmit, ...props }) => (
  <ViewContainer>
    <Margin top={4} bottom={4}>
      <H2>Create Instances</H2>
    </Margin>
    <Margin bottom={4}>
      <Name {...props} expanded={step === 'name'} />
    </Margin>
    <Margin bottom={4}>
      <Image {...props} expanded={step === 'image'} />
    </Margin>
    <Margin bottom={4}>
      <Package {...props} expanded={step === 'package'} />
    </Margin>
    <Margin bottom={4}>
      <Tags {...props} expanded={step === 'tags'} />
    </Margin>
    <Margin bottom={4}>
      <Metadata {...props} expanded={step === 'metadata'} />
    </Margin>
    <Margin bottom={4}>
      <Networks {...props} expanded={step === 'networks'} />
    </Margin>
    <Margin bottom={5}>
      <Firewall {...props} expanded={step === 'firewall'} />
    </Margin>
    <Margin bottom={4}>
      <CNS {...props} expanded={step === 'cns'} />
    </Margin>
    <Margin bottom={4}>
      <Affinity {...props} expanded={step === 'affinity'} />
    </Margin>
    {step === 'done' || step === 'affinity' ? (
      <Divider height={remcalc(1)} />
    ) : null}
    <Margin top={7} bottom={10}>
      <ReduxForm form="create-instance" onSubmit={handleSubmit}>
        {({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit}>
            <Button disabled={step !== 'done'} loading={submitting}>
              Deploy
            </Button>
          </form>
        )}
      </ReduxForm>
    </Margin>
  </ViewContainer>
);

export default compose(
  graphql(CreateInstanceMutation, { name: 'createInstance' }),
  connect(({ form, values }, ownProps) => {
    const name = get(
      form,
      'create-instance-name.values.name',
      '<instance-name>'
    );

    const firewall = get(
      form,
      'CREATE-INSTANCE-FIREWALL.values.enabled',
      false
    );

    const image = get(
      form,
      'create-instance-image.values.image',
      '<instance-image>'
    );

    const pkg = get(
      form,
      'create-instance-package.values.package',
      '<instance-image>'
    );

    const networks = get(
      form,
      'CREATE-INSTANCE-NETWORKS.values',
      '<instance-image>'
    );

    const metadata = get(values, 'create-instance-metadata', []);
    const receivedTags = get(values, 'create-instance-tags', []);
    const affinity = get(values, 'create-instance-affinity', []);
    const cns = get(values, 'create-instance-cns-enabled', true);
    const cnsServices = get(values, 'create-instance-cns-services', null);

    const tags = receivedTags.map(a => omit(a, 'expanded'));

    tags.push({ name: 'triton.cns.disable', value: !cns });

    if (cnsServices && cns) {
      tags.push({ name: 'triton.cns.services', value: cnsServices.join(',') });
    }

    const affRules = affinity
      .map(aff => ({
        conditional: aff['rule-instance-conditional'],
        placement: aff['rule-instance-placement'],
        identity: aff['rule-type'],
        key: aff['rule-instance-tag-key'],
        pattern: aff['rule-instance-tag-value-pattern'],
        value:
          aff['rule-type'] === 'name'
            ? aff['rule-instance-name']
            : aff['rule-instance-tag-value']
      }))
      .map(({ conditional, placement, identity, key, pattern, value }) => {
        const type = constantCase(
          `${conditional}_${placement === 'same' ? 'equal' : 'not_equal'}`
        );

        const patterns = {
          equalling: value => value,
          'not-equalling': `/^!${value}$/`,
          containing: `/${value}/`,
          starting: `/^${value}/`,
          ending: `/${value}$/`
        };

        const _key = identity === 'name' ? 'instance' : key;
        const _value = patterns[pattern](value);

        return {
          type,
          key: _key,
          value: _value
        };
      });

    return {
      forms: Object.keys(form), // improve this
      name: name.toLowerCase(),
      pkg,
      image,
      affinity: affRules,
      metadata: metadata.map(a => omit(a, 'expanded')),
      tags: uniqBy(tags, 'name'),
      firewall_enabled: firewall,
      networks: Object.keys(networks).filter(network => networks[network])
    };
  }),
  connect(null, (dispatch, ownProps) => {
    const {
      name,
      pkg,
      image,
      affinity,
      metadata,
      tags,
      firewall_enabled,
      networks,
      forms,
      createInstance,
      history
    } = ownProps;

    return {
      handleSubmit: async () => {
        const [err, res] = await intercept(
          createInstance({
            variables: {
              name,
              package: pkg,
              image,
              affinity,
              metadata,
              tags,
              firewall_enabled,
              networks
            }
          })
        );

        if (err) {
          return dispatch(
            stopSubmit(TABLE_FORM_NAME, {
              _error: parseError(err)
            })
          );
        }

        dispatch(forms.map(name => destroy(name)));

        history.push(`/instances/${res.data.createMachine.name}`);
      }
    };
  })
)(CreateInstance);
