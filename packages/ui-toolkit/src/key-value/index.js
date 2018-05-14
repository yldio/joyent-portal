import React, { Fragment } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Row, Col } from 'joyent-react-styled-flexboxgrid';
import { Field } from 'redux-form';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import Flex, { FlexItem } from 'styled-flex-component';
import is from 'styled-is';

import Message, {
  Title as MessageTitle,
  Description as MessageDescription
} from '../message';

import {
  default as BaseCard,
  Outlet as CardOutlet,
  Header as CardHeader,
  HeaderMeta as CardHeaderMeta
} from '../card';

import { FormGroup, Input, Textarea, FormLabel, FormMeta } from '../form';
import { Delete as DeleteIcon, Arrow as ArrowIcon } from '../icons';
import { H4 } from '../text/headings';
import Button from '../button';
import Divider from '../divider';

const Form = styled.form`
  margin-bottom: 0;
`;

const CollapsedKeyValue = styled.div`
  word-break: break-all;
  line-height: 1.5;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: block;
`;

const Card = styled(BaseCard)`
  ${is('borderless')`
    border: none;
    box-shadow: none;
  `};
`;

const Header = styled(CardHeader)`
  border-top: 0;
  border-left: 0;
  border-right: 0;
`;

const MarginalButton = styled(Button)`
  margin-right: ${remcalc(6)};
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
              <Textarea
                monospace
                name="name"
                resize="vertical"
                disabled={submitting}
                fluid
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
          <Margin right={3} top={0.5}>
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
  onToggleExpanded,
  onCancel = () => null,
  onRemove = () => null,
  theme = {},
  editor = null,
  onlyName = false,
  onlyValue = false,
  noRemove = false,
  borderless = false,
  shadow = true,
  customHeader,
  headless = false
}) => {
  const handleHeaderClick = method === 'edit' && onToggleExpanded;

  return (
    <Card
      collapsed={!expanded}
      actionable={Boolean(handleHeaderClick)}
      borderless={borderless}
      headless={headless}
      shadow={shadow}
    >
      {headless ? null : (
        <Header
          secondary={false}
          transparent={false}
          actionable={Boolean(handleHeaderClick)}
          onClick={handleHeaderClick}
        >
          <PaddingMaxWidth left={borderless ? 0 : 3} right={borderless ? 0 : 3}>
            <Flex alignCenter justifyBetween>
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
              {handleHeaderClick ? (
                <ArrowIcon
                  onClick={onToggleExpanded}
                  direction={expanded ? 'up' : 'down'}
                />
              ) : null}
            </Flex>
          </PaddingMaxWidth>
        </Header>
      )}
      {expanded ? (
        <CardOutlet>
          <Padding
            top={headless ? 0 : 3}
            bottom={borderless ? 0 : 3}
            horizontal={borderless ? 0 : 3}
          >
            {error && !submitting ? (
              <Row>
                <Col xs={12}>
                  <Margin bottom={5}>
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
                submitting={disabled || submitting}
                onlyName={onlyName}
                onlyValue={onlyValue}
              />
            ) : null}
            {input === 'textarea' ? (
              <TextareaKeyValue
                type={type}
                submitting={disabled || submitting}
                onlyName={onlyName}
                onlyValue={onlyValue}
                editor={editor}
              />
            ) : null}
            {input !== 'textarea' && input !== 'input'
              ? input(submitting)
              : null}
            <Margin top={2}>
              <Row between="xs" middle="xs">
                <Col xs={method === 'add' ? 12 : 7}>
                  <MarginalButton
                    type="button"
                    onClick={onCancel}
                    disabled={disabled || submitting}
                    secondary
                  >
                    <span>Cancel</span>
                  </MarginalButton>
                  <Button
                    type="submit"
                    disabled={pristine || invalid}
                    loading={submitting && !removing}
                  >
                    <span>{method === 'add' ? 'Create' : 'Save'}</span>
                  </Button>
                </Col>
                {!noRemove && (
                  <Col xs={method === 'add' ? false : 5}>
                    <Button
                      type="button"
                      onClick={onRemove}
                      disabled={disabled || submitting}
                      loading={removing}
                      secondary
                      right
                      icon
                      error
                    >
                      <Margin right={2}>
                        <DeleteIcon
                          disabled={disabled || submitting}
                          fill={disabled || submitting ? undefined : theme.red}
                        />
                      </Margin>
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
  <Form onSubmit={handleSubmit}>
    <KeyValue {...rest} />
  </Form>
));
