import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import { Field } from 'redux-form';
import styled from 'styled-components';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import { Padding } from 'styled-components-spacing';
import Flex, { FlexItem } from 'styled-flex-component';
import Editor from 'joyent-ui-toolkit/dist/es/editor';

import {
  Message,
  MessageDescription,
  H4,
  MessageTitle,
  Card,
  CardHeader,
  CardHeaderMeta,
  CardOutlet,
  FormGroup,
  FormLabel,
  Input,
  FormMeta,
  Button,
  Textarea,
  Divider,
  DeleteIcon
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
    const { input = {}, submitting } = this.props;

    return input.value === 'user-script' ? (
      <Field name="value" component={Editor} />
    ) : (
      <Textarea resize="vertical" disabled={submitting} fluid />
    );
  }
}

const TextareaKeyValue = ({ type, submitting }) => [
  <Row key="key">
    <Col xs={12}>
      <FormGroup name="name" field={Field} fluid>
        <FormLabel>{titleCase(type)} key</FormLabel>
        <Input type="text" disabled={submitting} />
        <FormMeta />
      </FormGroup>
      <Divider height={remcalc(12)} transparent />
    </Col>
  </Row>,
  <Row key="value">
    <Col xs={12}>
      <FormGroup name="value" field={Field} fluid>
        <FormLabel>{titleCase(type)} value</FormLabel>
        <Field
          name="name"
          fluid
          component={ValueTextareaField}
          props={{ submitting }}
        />
        <FormMeta />
      </FormGroup>
      <Divider height={remcalc(12)} transparent />
    </Col>
  </Row>
];

const InputKeyValue = ({ type, submitting }) => (
  <Flex full justifyStart contentStretch>
    <FlexItem basis="auto">
      <FormGroup name="name" field={Field} fluid>
        <FormLabel>{titleCase(type)} key</FormLabel>
        <Input type="text" disabled={submitting} />
        <FormMeta />
      </FormGroup>
    </FlexItem>
    <FlexItem basis={remcalc(12)} />
    <FlexItem basis="auto">
      <FormGroup name="value" field={Field} fluid>
        <FormLabel>{titleCase(type)} value</FormLabel>
        <Input disabled={submitting} />
        <FormMeta />
      </FormGroup>
    </FlexItem>
  </Flex>
);

export const KeyValue = ({
  input = 'input',
  type = 'metadata',
  method = 'add',
  error = null,
  expanded = true,
  submitting = false,
  pristine = true,
  removing = false,
  handleSubmit,
  onToggleExpanded = () => null,
  onCancel = () => null,
  onRemove = () => null,
  theme = {}
}) => {
  const handleHeaderClick = method === 'edit' && onToggleExpanded;

  return (
    <Card collapsed={!expanded} actionable={!expanded} shadow>
      <CardHeader
        secondary={false}
        transparent={false}
        actionable={Boolean(handleHeaderClick)}
        onClick={handleHeaderClick}
      >
        <CardHeaderMeta>
          {method === 'add' ? (
            <H4>{`${titleCase(method)} ${type}`}</H4>
          ) : (
            <CollapsedKeyValue>
              <Field
                name="name"
                type="text"
                component={({ input = {} }) =>
                  expanded ? `${input.value}: ` : <b>{`${input.value}: `}</b>
                }
              />
              <Field
                name="value"
                type="text"
                component={({ input = {} }) => input.value}
              />
            </CollapsedKeyValue>
          )}
        </CardHeaderMeta>
      </CardHeader>
      <CardOutlet>
        <Padding all={1}>
          {error && !submitting ? (
            <Row>
              <Col xs={12}>
                <Message error>
                  <MessageTitle>Ooops!</MessageTitle>
                  <MessageDescription>{error}</MessageDescription>
                </Message>
              </Col>
            </Row>
          ) : null}
          {input === 'input' ? (
            <InputKeyValue type={type} submitting={submitting} />
          ) : (
            <TextareaKeyValue type={type} submitting={submitting} />
          )}
          <Row between="xs" middle="xs">
            <Col xs={method === 'add' ? 12 : 7}>
              <Button
                type="button"
                onClick={onCancel}
                disabled={submitting}
                secondary
                marginless
              >
                <span>Cancel</span>
              </Button>
              <Button
                type="submit"
                disabled={pristine}
                loading={submitting && !removing}
                marginless
              >
                <span>{method === 'add' ? 'Create' : 'Save'}</span>
              </Button>
            </Col>
            <Col xs={method === 'add' ? false : 5}>
              <Button
                type="button"
                onClick={onRemove}
                disabled={submitting}
                loading={removing}
                secondary
                right
                icon
                error
                marginless
              >
                <DeleteIcon
                  disabled={submitting}
                  fill={submitting ? undefined : theme.red}
                />
                <span>Delete</span>
              </Button>
            </Col>
          </Row>
        </Padding>
      </CardOutlet>
    </Card>
  );
};

KeyValue.propTypes = {
  input: PropTypes.oneOf(['input', 'textarea']).isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.oneOf(['add', 'edit']).isRequired,
  removing: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggleExpanded: PropTypes.func,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func
};

export default withTheme(({ handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <KeyValue {...rest} />
    <Divider height={remcalc(13)} transparent />
  </form>
));
