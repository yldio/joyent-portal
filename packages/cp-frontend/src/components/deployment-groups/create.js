import React from 'react';
import { FormGroup, FormMeta, Input, Button } from 'joyent-ui-toolkit';
import { Field } from 'redux-form';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Dots2 } from 'styled-text-spinners';
import Bundle from 'react-bundle';

const Editor = ManifestEditor => ({ input }) =>
  <ManifestEditor mode="yaml" {...input} />;

export const Name = ({ handleSubmit, onCancel, dirty }) =>
  <form onSubmit={handleSubmit}>
    <Row>
      <Col xs={12} md={3} lg={3}>
        <FormGroup name="name" reduxForm>
          <FormMeta left />
          <Input type="text" />
        </FormGroup>
      </Col>
    </Row>
    <Row>
      <Button onClick={onCancel} secondary>Cancel</Button>
      <Button type="submit" disabled={!dirty}>Next</Button>
    </Row>
  </form>;

export const Manifest = ({ handleSubmit, onCancel, dirty, mode }) =>
  <form onSubmit={handleSubmit}>
    <Bundle load={() => import('joyent-manifest-editor')}>
      {ManifestEditor =>
        ManifestEditor
          ? <Field name="manifest" component={Editor(ManifestEditor)} />
          : <Dots2 />}
    </Bundle>
    <Row>
      <Button onClick={onCancel} secondary>Cancel</Button>
      <Button type="submit" disabled={!dirty}>Review</Button>
    </Row>
  </form>;

export const Review = ({ handleSubmit, onCancel, dirty, ...state }) =>
  <form onSubmit={handleSubmit}>
    <pre>{state.deploymentGroupName}</pre>
    <pre>{state.manifest}</pre>
    <Row>
      <Button onClick={onCancel} disabled={state.loading} secondary>
        Cancel
      </Button>
      <Button disabled={state.loading} type="submit">
        {state.loading ? <Dots2 /> : 'Provision'}
      </Button>
    </Row>
  </form>;
