import React from 'react';
import forceArray from 'force-array';

import {
  FormGroup,
  Input,
  FormLabel,
  ViewContainer,
  StatusLoader
} from 'joyent-ui-toolkit';

import Item from './item';

export default ({
  instances,
  loading,
  handleChange = () => null,
  handleSubmit
}) => {
  const _instances = forceArray(instances);

  const items = _instances.map((instance, i, all) => (
    <Item
      key={instance.id}
      {...instance}
      last={all.length - 1 === i}
      first={!i}
    />
  ));

  const _loading =
    !items.length && loading ? (
      <ViewContainer center>
        <StatusLoader />
      </ViewContainer>
    ) : null;

  return (
    <form onSubmit={() => handleSubmit(ctx => handleChange(ctx))}>
      <FormGroup name="filter" reduxForm>
        <FormLabel>Filter instances</FormLabel>
        <Input />
      </FormGroup>
      {_loading}
      {items}
    </form>
  );
};
