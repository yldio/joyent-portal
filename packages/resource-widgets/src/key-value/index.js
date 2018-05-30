import React, { Fragment } from 'react';
import { Margin, Padding } from 'styled-components-spacing';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { Row, Col as BaseCol } from 'joyent-react-styled-flexboxgrid';
import { Field } from 'redux-form';
import remcalc from 'remcalc';
import titleCase from 'title-case';
import Flex, { FlexItem } from 'styled-flex-component';
import is from 'styled-is';

import {
  H4,
  Button,
  Message,
  MessageTitle,
  MessageDescription,
  Card as BaseCard,
  CardOutlet,
  CardHeader,
  CardHeaderMeta,
  FormGroup,
  Input,
  Textarea,
  FormLabel,
  FormMeta,
  DeleteIcon,
  ArrowIcon
} from 'joyent-ui-toolkit';

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

const Col = styled(BaseCol)`
  ${is('mobile')`
    display: flex;
    flex-direction: column-reverse;
  `};
`;

const TextareaKeyValue = ({
  id = null,
  type,
  submitting,
  onlyName,
  onlyValue,
  editor,
  mobile
}) => (
  <Fragment>
    {onlyValue ? null : (
      <Row>
        <Col xs="12">
          <FormGroup
            id={id ? 'kv-input-key-' + id : null}
            name="name"
            field={Field}
            fluid
          >
            <FormLabel>{titleCase(type)} key</FormLabel>
            <Margin top="0.5">
              <Input
                onBlur={null}
                type="text"
                disabled={submitting}
                fluid={mobile}
              />
              <Row>
                <Col sm="7">
                  <FormMeta />
                </Col>
              </Row>
            </Margin>
          </FormGroup>
          <Divider height={remcalc(12)} transparent />
        </Col>
      </Row>
    )}
    {onlyName ? null : (
      <Row>
        <Col xs="12">
          <FormGroup
            id={id ? 'kv-input-value-' + id : null}
            name="value"
            field={Field}
            fluid
          >
            <FormLabel>{titleCase(type)} value</FormLabel>
            <Margin top="0.5">
              <Textarea
                monospace
                name="name"
                resize="vertical"
                disabled={submitting}
                fluid
              />
            </Margin>
            <Row>
              <Col sm="7">
                <FormMeta />
              </Col>
            </Row>
          </FormGroup>
          <Divider height={remcalc(12)} transparent />
        </Col>
      </Row>
    )}
  </Fragment>
);

const InputKeyValue = ({
  id = null,
  type,
  submitting,
  typeLabel,
  onlyName,
  onlyValue,
  fluid = false
}) => (
  <Flex wrap justifyStart contentStretch column={fluid}>
    {onlyValue ? null : (
      <FlexItem basis="auto">
        <FormGroup
          id={id ? 'kv-input-name-' + id : null}
          name="name"
          field={Field}
          fluid
        >
          <FormLabel>
            {titleCase(type)} {typeLabel}
          </FormLabel>
          <Margin right={fluid ? '0' : '3'} top="0.5">
            <Input onBlur={null} type="text" disabled={submitting} fluid />
            <Row>
              <Col sm="7">
                <FormMeta />
              </Col>
            </Row>
          </Margin>
        </FormGroup>
      </FlexItem>
    )}
    {onlyName ? null : (
      <Fragment>
        <FlexItem basis="auto">
          <Margin top={fluid ? '2' : '0'}>
            <FormGroup
              id={id ? 'kv-input-value-' + id : null}
              name="value"
              field={Field}
              fluid
            >
              <FormLabel>{titleCase(type)} value</FormLabel>
              <Margin top="0.5">
                <Input onBlur={null} type="text" disabled={submitting} fluid />
                <Row>
                  <Col sm="7">
                    <FormMeta />
                  </Col>
                </Row>
              </Margin>
            </FormGroup>
          </Margin>
        </FlexItem>
      </Fragment>
    )}
  </Flex>
);

export const KeyValue = ({
  id = null,
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
  const mobile = theme.screen === 'mobile';

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
          <PaddingMaxWidth
            left={borderless ? '0' : '3'}
            right={borderless ? '0' : '3'}
          >
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
            top={headless ? '0' : '3'}
            bottom={borderless ? '0' : '3'}
            horizontal={borderless ? '0' : '3'}
          >
            {error && !submitting ? (
              <Row>
                <Col xs="12">
                  <Margin bottom="5">
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
                id={id}
                onBlur={null}
                type={type}
                typeLabel={typeLabel}
                submitting={disabled || submitting}
                onlyName={onlyName}
                onlyValue={onlyValue}
                fluid={mobile}
              />
            ) : null}
            {input === 'textarea' ? (
              <TextareaKeyValue
                id={id}
                type={type}
                submitting={disabled || submitting}
                onlyName={onlyName}
                onlyValue={onlyValue}
                editor={editor}
                mobile={mobile}
              />
            ) : null}
            {input !== 'textarea' && input !== 'input'
              ? input(submitting)
              : null}
            <Margin top={mobile ? '3' : '2'}>
              <Row between="xs" middle="xs">
                <Col xs={method === 'add' ? '12' : '7'} mobile={mobile}>
                  <Margin top={mobile ? '1' : '0'} inline>
                    <MarginalButton
                      id={id ? 'kv-cancel-button-' + id : null}
                      type="button"
                      onClick={onCancel}
                      disabled={disabled || submitting}
                      secondary
                      fluid={mobile}
                    >
                      <span>Cancel</span>
                    </MarginalButton>
                  </Margin>
                  <Button
                    id={id ? 'kv-submit-button-' + id : null}
                    type="submit"
                    disabled={pristine || invalid}
                    loading={submitting && !removing}
                    fluid={mobile}
                  >
                    <span>{method === 'add' ? 'Create' : 'Save'}</span>
                  </Button>
                </Col>
                {!noRemove && (
                  <Col xs={method === 'add' ? false : '5'}>
                    <Button
                      type="button"
                      onClick={onRemove}
                      disabled={disabled || submitting}
                      loading={removing}
                      secondary
                      right
                      icon
                      error
                      id={id ? 'kv-remove-button-' + id : null}
                    >
                      <Margin right="2">
                        <DeleteIcon
                          disabled={disabled || submitting}
                          fill={disabled || submitting ? undefined : theme.red}
                        />
                      </Margin>
                      <span>Delete</span>
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
