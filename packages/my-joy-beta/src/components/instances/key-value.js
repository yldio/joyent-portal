import React, { PureComponent } from 'react';
import { Row, Col } from 'react-styled-flexboxgrid';
import Value from 'react-redux-values';
import { Field } from 'redux-form';
import styled from 'styled-components';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import { Margin, Padding } from 'styled-components-spacing';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

import {
  Message,
  MessageDescription,
  H4,
  MessageTitle,
  Card,
  CardHeader,
  CardHeaderMeta,
  CardHeaderBox,
  CardOutlet,
  ChevronIcon,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  Textarea,
  Divider
} from 'joyent-ui-toolkit';

const CollapsedKeyValue = styled.span`
  word-break: break-all;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

class ValueTextareaField extends PureComponent {
  render() {
    const { input, submitting } = this.props;

    return input.value === 'user-script' ? (
      <Field name="value" component={Editor} />
    ) : (
      <Textarea resize="vertical" disabled={submitting} fluid />
    );
  }
}

const KeyValue = ({
  id,
  label = '',
  textarea,
  create,
  last,
  first,
  expanded,
  removing,
  pristine,
  error,
  submitting,
  onRemove,
  onToggleExpanded,
  handleSubmit,
  onClear
}) => {
  const _error = error &&
    !submitting && (
      <Message error>
        <MessageTitle>Ooops!</MessageTitle>
        <MessageDescription>{error}</MessageDescription>
      </Message>
    );

  const _meta = expanded ? (
    <H4>{create ? `Create ${label}` : `Edit ${label}`}</H4>
  ) : (
    <CollapsedKeyValue>
      <Field
        name="name"
        type="text"
        component={({ input }) => <b>{`${input.value}: `}</b>}
      />
      <Field name="value" type="text" component={({ input }) => input.value} />
    </CollapsedKeyValue>
  );

  const chevronToggle = create ? null : (
    <CardHeaderBox onClick={onToggleExpanded} actionable={expanded}>
      <ChevronIcon />
    </CardHeaderBox>
  );

  const _valueField = textarea ? (
    <Field
      name="name"
      fluid
      component={ValueTextareaField}
      props={{ submitting }}
    />
  ) : (
    <Input disabled={submitting} />
  );

  const _cancel = (
    <Button
      type="button"
      key="cancel"
      bold
      onClick={
        create
          ? pristine ? onToggleExpanded : onClear
          : pristine ? onRemove : onClear
      }
      disabled={submitting}
      loading={submitting && removing}
      secondary
      marginless
    >
      {create ? (pristine ? 'Cancel' : 'Clear') : pristine ? 'Remove' : 'Clear'}
    </Button>
  );

  const _submit = (
    <Button
      type="submit"
      key="submit"
      bold
      disabled={pristine || submitting}
      loading={submitting && !removing}
      marginless
    >
      {create ? 'Create' : 'Update'}
    </Button>
  );

  return (
    <form onSubmit={handleSubmit}>
      <Divider
        transparent
        marginBottom={!first && expanded ? remcalc(13) : 0}
      />
      <Card
        collapsed={!expanded}
        actionable={!expanded}
        bottomless={!last && !expanded}
      >
        <CardHeader
          secondary={false}
          transparent={false}
          onClick={onToggleExpanded}
          actionable
        >
          <CardHeaderMeta>
            <Padding left={1}>{_meta}</Padding>
          </CardHeaderMeta>
          {chevronToggle}
        </CardHeader>
        <CardOutlet>
          <Padding all={1}>
            <Row>
              <Col xs={12}>{_error}</Col>
            </Row>
            <Row>
              <Col xs={6}>
                <FormGroup name="name" field={Field} fluid>
                  <FormLabel>Enter {titleCase(label)} key</FormLabel>
                  <Input type="text" disabled={submitting} />
                  <FormMeta />
                </FormGroup>
              </Col>
              <Col xs={6}>
                <FormGroup name="value" field={Field} fluid>
                  <FormLabel>Enter {titleCase(label)} value</FormLabel>
                  {_valueField}
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Margin top={2}>
                  {_cancel}
                  {_submit}
                </Margin>
              </Col>
            </Row>
          </Padding>
        </CardOutlet>
      </Card>
      <Divider transparent marginBottom={last || expanded ? remcalc(13) : 0} />
    </form>
  );
};

export default ({ id, ...rest }) => (
  <Value name={`${id}-removing`}>
    {({ value: removing }) => (
      <KeyValue {...rest} removing={removing} id={id} />
    )}
  </Value>
);
