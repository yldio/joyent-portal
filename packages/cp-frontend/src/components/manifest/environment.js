import React from 'react';
import { Field } from 'redux-form';
import remcalc from 'remcalc';
import { Row } from 'react-styled-flexboxgrid';
import { Button, Divider, H3, P } from 'joyent-ui-toolkit';

import { EEditor } from './editors';
import Files from './files';

const EnvironmentDivider = Divider.extend`margin-top: ${remcalc(34)};`;
const ButtonsRow = Row.extend`margin: ${remcalc(29)} 0 ${remcalc(60)} 0;`;

const Subtitle = H3.extend`
  margin-top: ${remcalc(34)};
  margin-bottom: ${remcalc(3)};
`;

const Description = P.extend`
  margin-top: ${remcalc(3)};
  margin-bottom: ${remcalc(20)};
`;

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

export default Environment;
