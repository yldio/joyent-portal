import React from 'react';
import { Field } from 'redux-form';
import styled from 'styled-components';
import remcalc from 'remcalc';
import { EEditor } from './editors';

import {
  FormGroup,
  Input,
  Button,
  Card
} from 'joyent-ui-toolkit';

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

const FileCard = Card.extend`padding: ${remcalc(24)} ${remcalc(19)};`;

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

export default Files;