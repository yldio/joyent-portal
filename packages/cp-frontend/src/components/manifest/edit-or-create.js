import React, { Component } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import { Row, Col } from 'react-styled-flexboxgrid';
import Bundle from 'react-bundle';
import remcalc from 'remcalc';
import forceArray from 'force-array';
import is from 'styled-is';

import { Loader } from '@components/messaging';

import {
  FormGroup,
  FormMeta,
  Input,
  Button,
  Card,
  Progressbar,
  ProgressbarItem,
  ProgressbarButton,
  H3,
  P,
  typography,
  Divider,
  Chevron
} from 'joyent-ui-toolkit';

const EnvironmentChevron = styled(Chevron)`
  float: right;
`;

const EnvironmentDivider = Divider.extend`
  margin-top: ${remcalc(34)};
`;

const ServiceDivider = Divider.extend`
  margin: ${remcalc(13)} ${remcalc(-20)} 0 ${remcalc(-20)};
`;

const Dl = styled.dl`
  margin: 0;
`;

const ServiceName = H3.extend`
  margin-top: 0;
  margin-bottom: ${remcalc(5)};
  line-height: 1.6;
  font-size: ${remcalc(18)};
`;

const ImageTitle = H3.extend`
  display: inline-block;
  margin: 0;
`;

const Image = styled.span`
  ${typography.fontFamily};
  font-size: ${remcalc(15)};
`;

const ServiceEnvironmentTitle = P.extend`
  margin: ${remcalc(13)} 0 0 0;

  ${is('expanded')`
    margin-bottom: ${remcalc(13)};
  `};
`;

const ButtonsRow = Row.extend`
  margin: ${remcalc(29)} 0 ${remcalc(60)} 0;
`;

const FilenameContainer = styled.span`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: stretch;
  align-items: stretch;
`;

const FilenameInput = styled(Input)`
  order: 0;
  flex: 1 1 auto;
  align-self: stretch;
  margin: 0 0 ${remcalc(13)} 0;
`;

const FilenameRemove = Button.extend`
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  margin: 0 0 0 ${remcalc(8)};
  height: ${remcalc(48)};
`;

const FileCard = Card.extend`
  padding: ${remcalc(24)} ${remcalc(19)};
`;

const ServiceCard = Card.extend`
  padding: ${remcalc(13)} ${remcalc(19)};
  min-height: initial;
`;

const Subtitle = H3.extend`
  margin-top: ${remcalc(34)};
  margin-bottom: ${remcalc(3)};
`;

const Description = P.extend`
  margin-top: ${remcalc(3)};
  margin-bottom: ${remcalc(20)};
`;

class ManifestEditorBundle extends Component {
  constructor() {
    super();

    this.state = {};

    this.handleRender = this.handleRender.bind(this);
  }
  handleRender(ManifestEditor) {
    if (ManifestEditor) {
      setTimeout(() => {
        this.setState({ ManifestEditor });
      }, 80);
    }

    return <Loader />;
  }
  render() {
    if (!this.state.ManifestEditor) {
      return (
        <Bundle load={() => import('joyent-manifest-editor')}>
          {this.handleRender}
        </Bundle>
      );
    }

    const { ManifestEditor } = this.state;
    const { children, ...rest } = this.props;

    return <ManifestEditor {...rest}>{children}</ManifestEditor>;
  }
}

const MEditor = ({ input, defaultValue, readOnly }) => (
  <ManifestEditorBundle
    mode="yaml"
    {...input}
    value={input.value || defaultValue}
    readOnly={readOnly}
  />
);

const EEditor = ({ input, defaultValue, readOnly }) => (
  <ManifestEditorBundle
    mode="ini"
    {...input}
    value={input.value || defaultValue}
    readOnly={readOnly}
  />
);

export const Name = ({ handleSubmit, onCancel, dirty }) => (
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
      <Button type="button" onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button type="submit" disabled={!dirty}>
        Next
      </Button>
    </ButtonsRow>
  </form>
);

export const Manifest = ({
  handleSubmit,
  onCancel,
  dirty,
  defaultValue = '',
  loading
}) => (
  <form onSubmit={handleSubmit}>
    <Field name="manifest" defaultValue={defaultValue} component={MEditor} />
    <ButtonsRow>
      <Button type="button" onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button
        disabled={!(dirty || !loading || defaultValue.length)}
        loading={loading}
        type="submit"
      >
        Environment
      </Button>
    </ButtonsRow>
  </form>
);

const File = ({ id, name, value, onRemoveFile, readOnly }) => {
  const removeButton = !readOnly ? (
    <FilenameRemove type="button" onClick={onRemoveFile} secondary>
      Remove
    </FilenameRemove>
  ) : null;

  const fileEditor = !readOnly ? (
    <Field name={`file-value-${id}`} defaultValue={value} component={EEditor} />
  ) : (
    <EEditor input={{ value }} readOnly />
  );

  const input = !readOnly ? (
    <FilenameInput type="text" placeholder="Filename including extension…" />
  ) : (
    <FilenameInput
      type="text"
      placeholder="Filename including extension…"
      value={name}
    />
  );

  return (
    <FileCard>
      <FormGroup name={`file-name-${id}`} reduxForm={!readOnly}>
        <FilenameContainer>
          {input}
          {removeButton}
        </FilenameContainer>
      </FormGroup>
      {fileEditor}
    </FileCard>
  );
};

const Files = ({ files, onAddFile, onRemoveFile, readOnly }) => {
  const footer = !readOnly ? (
    <Button type="button" onClick={onAddFile} secondary>
      Create new .env file
    </Button>
  ) : null;

  return (
    <div>
      {files.map(({ id, ...rest }) => (
        <File
          key={id}
          id={id}
          onRemoveFile={() => onRemoveFile(id)}
          readOnly={readOnly}
          {...rest}
        />
      ))}
      {footer}
    </div>
  );
};

export const Environment = ({
  handleSubmit,
  onCancel,
  onAddFile,
  onRemoveFile,
  dirty,
  defaultValue = '',
  files = [],
  readOnly = false,
  loading
}) => {
  const envEditor = !readOnly ? (
    <Field name="environment" defaultValue={defaultValue} component={EEditor} />
  ) : (
    <EEditor input={{ value: defaultValue }} readOnly />
  );

  const footerDivider = !readOnly ? <EnvironmentDivider /> : null;

  const footer = !readOnly ? (
    <ButtonsRow>
      <Button type="button" onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button
        disabled={!(dirty || !loading || defaultValue.length)}
        loading={loading}
        type="submit"
      >
        Continue
      </Button>
    </ButtonsRow>
  ) : null;

  return (
    <form onSubmit={handleSubmit}>
      <Subtitle>Global variables</Subtitle>
      <Description>
        These variables are going to be availabe for interpolation in the
        manifest
      </Description>
      {envEditor}
      <EnvironmentDivider />
      <Subtitle>Enviroment files</Subtitle>
      <Description>
        The variables from this files will be applied to the services that
        require them
      </Description>
      <Files
        files={files}
        onAddFile={onAddFile}
        onRemoveFile={onRemoveFile}
        readOnly={readOnly}
      />
      {footerDivider}
      {footer}
    </form>
  );
};

const EnvironmentReview = ({ environment }) => {
  const value = environment
    .map(({ name, value }) => `${name}=${value}`)
    .join('\n');

  return <EEditor input={{ value }} />;
};

export const Review = ({
  handleSubmit,
  onEnvironmentToggle = () => null,
  onCancel,
  dirty,
  loading,
  environmentToggles,
  ...state
}) => {
  const serviceList = forceArray(state.services).map(({ name, config }) => (
    <ServiceCard key={name}>
      <ServiceName>{name}</ServiceName>
      <Dl>
        <dt>
          <ImageTitle>Image:</ImageTitle> <Image>{config.image}</Image>
        </dt>
      </Dl>
      {config.environment && config.environment.length ? (
        <ServiceDivider />
      ) : null}
      {config.environment && config.environment.length ? (
        <ServiceEnvironmentTitle
          expanded={environmentToggles[name]}
          onClick={() => onEnvironmentToggle(name)}
        >
          Environment variables{' '}
          <EnvironmentChevron
            down={!environmentToggles[name]}
            up={environmentToggles[name]}
          />
        </ServiceEnvironmentTitle>
      ) : null}
      {config.environment &&
      config.environment.length &&
      environmentToggles[name] ? (
        <EnvironmentReview environment={config.environment} />
      ) : null}
    </ServiceCard>
  ));

  return (
    <form onSubmit={handleSubmit}>
      {serviceList}
      <ButtonsRow>
        <Button type="button" onClick={onCancel} disabled={loading} secondary>
          Cancel
        </Button>
        <Button disabled={loading} loading={loading} type="submit">
          Confirm and Deploy
        </Button>
      </ButtonsRow>
    </form>
  );
};

export const Progress = ({ stage, create, edit }) => {
  const _nameCompleted = stage !== 'name';
  const _nameActive = stage === 'name';

  const _name = !create ? null : (
    <ProgressbarItem>
      <ProgressbarButton
        zIndex="10"
        completed={_nameCompleted}
        active={_nameActive}
        first
      >
        Name the group
      </ProgressbarButton>
    </ProgressbarItem>
  );

  const _manifestCompleted = ['environment', 'review'].indexOf(stage) >= 0;
  const _manifestActive = create ? stage === 'manifest' : stage === 'edit';

  const _manifest = (
    <ProgressbarItem>
      <ProgressbarButton
        zIndex="9"
        completed={_manifestCompleted}
        active={_manifestActive}
        first={edit}
      >
        Define Services
      </ProgressbarButton>
    </ProgressbarItem>
  );

  const _environmentCompleted = stage === 'review';
  const _environmentActive = stage === 'environment';

  const _environment = (
    <ProgressbarItem>
      <ProgressbarButton
        zIndex="8"
        completed={_environmentCompleted}
        active={_environmentActive}
      >
        Define Environment
      </ProgressbarButton>
    </ProgressbarItem>
  );

  const _reviewActive = stage === 'review';

  const _review = (
    <ProgressbarItem>
      <ProgressbarButton zIndex="7" active={_reviewActive} last>
        Review and deploy
      </ProgressbarButton>
    </ProgressbarItem>
  );

  return (
    <Progressbar>
      {_name}
      {_manifest}
      {_environment}
      {_review}
    </Progressbar>
  );
};
