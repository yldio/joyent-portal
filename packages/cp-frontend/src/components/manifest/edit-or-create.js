import React, { Component } from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import SimpleTable from 'react-simple-table';
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
  Progressbar,
  ProgressbarItem,
  ProgressbarButton,
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
`;

const FilenameRemove = Button.extend`
  order: 0;
  flex: 0 1 auto;
  align-self: auto;
  margin: ${remcalc(8)};
  margin-right: 0;
  height: ${remcalc(48)};
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

    return <Dots2 />;
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

    return (
      <ManifestEditor {...rest}>
        {children}
      </ManifestEditor>
    );
  }
}

const MEditor = ({ input, defaultValue }) =>
  <ManifestEditorBundle
    mode="yaml"
    {...input}
    value={input.value || defaultValue}
  />;

const EEditor = ({ input, defaultValue }) =>
  <ManifestEditorBundle
    mode="ini"
    {...input}
    value={input.value || defaultValue}
  />;

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
      <Button onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button type="submit" disabled={!dirty}>
        Next
      </Button>
    </ButtonsRow>
  </form>;

export const Manifest = ({
  handleSubmit,
  onCancel,
  dirty,
  defaultValue = '',
  loading
}) =>
  <form onSubmit={handleSubmit}>
    <Field name="manifest" defaultValue={defaultValue} component={MEditor} />
    <ButtonsRow>
      <Button onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button
        disabled={!(dirty || !loading || defaultValue.length)}
        type="submit"
      >
        Environment
      </Button>
    </ButtonsRow>
  </form>;

const Filename = ({ name, onRemoveFile }) =>
  <FilenameContainer>
    <FilenameInput
      type="text"
      placeholder="Filename including extension…"
      defaultValue={name}
    />
    <FilenameRemove type="button" onClick={onRemoveFile} secondary>
      Remove
    </FilenameRemove>
  </FilenameContainer>;

export const Files = ({ loading, files, onRemoveFile }) => {
  if (loading) {
    return null;
  }

  const _files = files.map(({ id, name, value }) =>
    <div key={id}>
      <FormGroup name={`file-name-${id}`} reduxForm>
        <FormMeta left />
        <Filename name={name} onRemoveFile={() => onRemoveFile(id)} />
      </FormGroup>
      <Field
        name={`file-value-${id}`}
        defaultValue={value}
        component={EEditor}
      />
    </div>
  );

  return (
    <div>
      <H3>Files:</H3>
      {_files}
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
  loading
}) =>
  <form onSubmit={handleSubmit}>
    <Field name="environment" defaultValue={defaultValue} component={EEditor} />
    <Files files={files} onRemoveFile={onRemoveFile} loading={loading} />
    <ButtonsRow>
      <Button onClick={onCancel} secondary>
        Cancel
      </Button>
      <Button type="button" onClick={onAddFile} secondary>
        Add File
      </Button>
      <Button
        disabled={!(dirty || !loading || defaultValue.length)}
        type="submit"
      >
        {loading ? <Dots2 /> : 'Review'}
      </Button>
    </ButtonsRow>
  </form>;

export const Review = ({ handleSubmit, onCancel, dirty, ...state }) => {
  const serviceList = forceArray(state.services).map(({ name, config }) =>
    <ServiceCard key={name}>
      <Dl>
        <dt>
          <ServiceName>
            {name}
          </ServiceName>
        </dt>
        <dt>
          <ImageTitle>Image:</ImageTitle> <Image>{config.image}</Image>
        </dt>
        {config.environment.length
          ? <dt>
              <ImageTitle>Environment:</ImageTitle>
            </dt>
          : undefined}
        {config.environment.length
          ? <SimpleTable
              columns={[
                {
                  columnHeader: 'Name',
                  path: 'name'
                },
                {
                  columnHeader: 'Value',
                  path: 'value'
                }
              ]}
              data={config.environment}
            />
          : undefined}
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

export const Progress = ({ stage, create, edit }) => {
  const _nameCompleted = stage !== 'name';
  const _nameActive = stage === 'name';

  const _name = !create
    ? null
    : <ProgressbarItem>
        <ProgressbarButton
          zIndex="10"
          completed={_nameCompleted}
          active={_nameActive}
          first
        >
          Name the group
        </ProgressbarButton>
      </ProgressbarItem>;

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
