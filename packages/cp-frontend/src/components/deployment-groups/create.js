import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Dots2 } from 'styled-text-spinners';
import Bundle from 'react-bundle';
import remcalc from 'remcalc';
import forceArray from 'force-array';

import {
  FormGroup,
  FormMeta,
  Input,
  Button,
  Card,
  H3,
  typography
} from 'joyent-ui-toolkit';

const Dl = styled.dl`
  margin: ${remcalc(13)} ${remcalc(19)};
`;

const ServiceName = H3.extend`
  margin-top: 0;
  margin-bottom: 0;
  line-height: 1.6;
  font-weight: 600;
`;

const ServiceCard = Card.extend`
  min-height: ${remcalc(72)};
`;

const ImageTitle = ServiceName.extend`
  display: inline-block;
`;

const Image = styled.span`
  ${typography.fontFamily};
`;

const ButtonsRow = Row.extend`
  margin-top: ${remcalc(29)};
  margin-bottom: ${remcalc(60)};
`;

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
    <ButtonsRow>
      <Button onClick={onCancel} secondary>Cancel</Button>
      <Button type="submit" disabled={!dirty}>Next</Button>
    </ButtonsRow>
  </form>;

export const Manifest = ({ handleSubmit, onCancel, dirty, mode, loading }) =>
  <form onSubmit={handleSubmit}>
    <Bundle load={() => import('joyent-manifest-editor')}>
      {ManifestEditor =>
        ManifestEditor
          ? <Field name="manifest" component={Editor(ManifestEditor)} />
          : <Dots2 />}
    </Bundle>
    <ButtonsRow>
      <Button onClick={onCancel} secondary>Cancel</Button>
      <Button disabled={loading || !dirty} type="submit">
        {loading ? <Dots2 /> : 'Review'}
      </Button>
    </ButtonsRow>
  </form>;

export const Review = ({ handleSubmit, onCancel, dirty, ...state }) => {
  const serviceList = forceArray(state.services).map(({ name, image }) =>
    <ServiceCard>
      <Dl>
        <dt><ServiceName>{name}</ServiceName></dt>
        <dt><ImageTitle>Image:</ImageTitle> <Image>{image}</Image></dt>
      </Dl>
    </ServiceCard>
  );

  return (
    <form onSubmit={handleSubmit}>
      {serviceList}
      <ButtonsRow>
        <Button onClick={onCancel} disabled={state.loading} secondary>
          Cancel
        </Button>
        <Button disabled={state.loading} type="submit">
          {state.loading ? <Dots2 /> : 'Confirm and Deploy'}
        </Button>
      </ButtonsRow>
    </form>
  );
};
