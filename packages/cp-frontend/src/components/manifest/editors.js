import React from 'react';
import ManifestEditorBundle from './manifest-editor';

export const MEditor = ({ input, defaultValue, readOnly }) => (
  <ManifestEditorBundle
    mode="yaml"
    {...input}
    value={input.value || defaultValue}
    readOnly={readOnly}
  />
);

export const EEditor = ({ input, defaultValue, readOnly }) => (
  <ManifestEditorBundle
    mode="ini"
    {...input}
    value={input.value || defaultValue}
    readOnly={readOnly}
  />
);
