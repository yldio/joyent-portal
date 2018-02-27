import React, { PureComponent, Fragment } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Field } from 'redux-form';
import styled from 'styled-components';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import Flex, { FlexItem } from 'styled-flex-component';

import Message, {
  Title as MessageTitle,
  Description as MessageDescription
} from '../message';

import Card, {
  Outlet as CardOutlet,
  Header as CardHeader,
  HeaderMeta as CardHeaderMeta
} from '../card';

import { FormGroup, Input, Textarea, FormLabel, FormMeta } from '../form';
import { Delete as DeleteIcon, Arrow as ArrowIcon } from '../icons';
import { H4 } from '../text/headings';
import Button from '../button';
import Divider from '../divider';

const CollapsedKeyValue = styled.div`
  word-break: break-all;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

const PaddingMaxWidth = styled(Padding)`
  word-wrap: break-word;
  overflow-wrap: break-word;
  width: 100%;
  box-sizing: border-box;
`;

const Meta = styled(CardHeaderMeta)`
  height: ${remcalc(47)};
  max-width: 98%;
`;

const Bold = styled.span`
  font-weight: ${props => props.theme.font.weight.semibold};
`;

class ValueTextareaField extends PureComponent {
  render() {
    const { input = {}, submitting, editor } = this.props;

    return input.value === 'user-script' ? (
      <Field
        name="value"
        component={props =>
          React.createElement(editor, {
            ...props,
            mode: 'sh'
          })
        }
      />
    ) : (
      <Textarea monospace resize="vertical" disabled={submitting} fluid />
    );
  }
}

const TextareaKeyValue = ({
  type,
  submitting,
  onlyName,
  onlyValue,
  editor
}) => (
  <Fragment>
    {!onlyValue ? (
      <Row>
        <Col xs={12}>
          <FormGroup name="name" field={Field} fluid>
            <FormLabel>{titleCase(type)} key</FormLabel>
            <Margin top={0.5}>
              <Input onBlur={null} type="text" disabled={submitting} />
              <Row>
                <Col sm={7}>
                  <FormMeta />
                </Col>
              </Row>
            </Margin>
          </FormGroup>
          <Divider height={remcalc(12)} transparent />
        </Col>
      </Row>
    ) : null}
    {!onlyName ? (
      <Row>
        <Col xs={12}>
          <FormGroup name="value" field={Field} fluid>
            <FormLabel>{titleCase(type)} value</FormLabel>
            <Margin top={0.5}>
              <Field
                name="name"
                fluid
                component={ValueTextareaField}
                props={{ submitting, editor }}
              />
            </Margin>
            <Row>
              <Col sm={7}>
                <FormMeta />
              </Col>
            </Row>
          </FormGroup>
          <Divider height={remcalc(12)} transparent />
        </Col>
      </Row>
    ) : null}
  </Fragment>
);

const InputKeyValue = ({
  type,
  submitting,
  typeLabel,
  onlyName,
  onlyValue
}) => (
  <Flex wrap justifyStart contentStretch>
    {!onlyValue ? (
      <FlexItem basis="auto">
        <FormGroup name="name" field={Field} fluid>
          <FormLabel>
            {titleCase(type)} {typeLabel}
          </FormLabel>
          <Margin top={0.5}>
            <Input onBlur={null} type="text" disabled={submitting} />
            <Row>
              <Col sm={7}>
                <FormMeta />
              </Col>
            </Row>
          </Margin>
        </FormGroup>
      </FlexItem>
    ) : null}
    {!onlyName ? (
      <Fragment>
        <FlexItem basis={remcalc(12)} />
        <FlexItem basis="auto">
          <FormGroup name="value" field={Field} fluid>
            <FormLabel>{titleCase(type)} value</FormLabel>
            <Margin top={0.5}>
              <Input onBlur={null} type="text" disabled={submitting} />
              <Row>
                <Col sm={7}>
                  <FormMeta />
                </Col>
              </Row>
            </Margin>
          </FormGroup>
        </FlexItem>
      </Fragment>
    ) : null}
  </Flex>
);

export const KeyValue = ({
  disabled = false,
  input = 'input',
  type = 'metadata',
  typeLabel = 'key',
  method = 'add',
  initialValues = {},
  error = null,
  expanded = true,
  submitting = false,
  pristine = true,
  invalid = false,
  removing = false,
  handleSubmit,
  onToggleExpanded = () => null,
  onCancel = () => null,
  onRemove = () => null,
  theme = {},
  editor = null,
  onlyName = false,
  onlyValue = false,
  noRemove = false,
  customHeader
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
        <PaddingMaxWidth left={3} right={3}>
          <Flex alignCenter justifyBetween full>
            <Meta>
              {method === 'add' || method === 'create' ? (
                <H4>{`${titleCase(method)} ${type}`}</H4>
              ) : (
                <CollapsedKeyValue>
                  {customHeader ? customHeader : null}
                  {initialValues.name ? (
                    <Fragment>
                      {expanded ? (
                        <span>{`${initialValues.name}${': '}`}</span>
                      ) : (
                        <Bold>{`${initialValues.name}${': '}`}</Bold>
                      )}
                      <span>{initialValues.value}</span>
                    </Fragment>
                  ) : null}
                </CollapsedKeyValue>
              )}
            </Meta>
            {method === 'edit' && !disabled ? (
              <ArrowIcon
                onClick={onToggleExpanded}
                direction={expanded ? 'up' : 'down'}
              />
            ) : null}
          </Flex>
        </PaddingMaxWidth>
      </CardHeader>
      {expanded ? (
        <CardOutlet>
          <Padding all={3}>
            {error && !submitting ? (
              <Row>
                <Col xs={12}>
                  <Margin bottom={4}>
                    <Message error>
                      <MessageTitle>Ooops!</MessageTitle>
                      <MessageDescription>{error}</MessageDescription>
                    </Message>
                  </Margin>
                </Col>
              </Row>
            ) : null}
            {input === 'input' ? (
              <InputKeyValue
                onBlur={null}
                type={type}
                typeLabel={typeLabel}
                submitting={submitting}
                onlyName={onlyName}
                onlyValue={onlyValue}
              />
            ) : null}
            {input === 'textarea' ? (
              <TextareaKeyValue
                type={type}
                submitting={submitting}
                onlyName={onlyName}
                onlyValue={onlyValue}
                editor={editor}
              />
            ) : null}
            {input !== 'textarea' && input !== 'input'
              ? input(submitting)
              : null}
            <Margin top={1}>
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
                    disabled={pristine || invalid}
                    loading={submitting && !removing}
                    marginless
                  >
                    <span>{method === 'add' ? 'Create' : 'Save'}</span>
                  </Button>
                </Col>
                {!noRemove && (
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
                      <span>Remove</span>
                    </Button>
                  </Col>
                )}
              </Row>
            </Margin>
          </Padding>
        </CardOutlet>
      ) : null}
    </Card>
  );
};

KeyValue.propTypes = {
  input: PropTypes.oneOf(['input', 'textarea']).isRequired,
  type: PropTypes.string.isRequired,
  method: PropTypes.oneOf(['add', 'edit']).isRequired,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.string
  }).isRequired,
  removing: PropTypes.bool.isRequired,
  expanded: PropTypes.bool.isRequired,
  onToggleExpanded: PropTypes.func,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func
};

export default withTheme(({ handleSubmit, ...rest }) => (
  <form onSubmit={handleSubmit}>
    <KeyValue {...rest} />
  </form>
));
