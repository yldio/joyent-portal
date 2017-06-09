import React, { Component } from 'react';
import ReactCodeMirror from 'react-codemirror';
import PropTypes from 'prop-types';

const options = {
  theme: 'eclipse',
  indentUnit: 2,
  smartIndent: true,
  tabSize: 2,
  indentWithTabs: false,
  electricChars: true,
  lineNumbers: true,
  inputStyle: 'contenteditable',
  readOnly: false,
  lint: true,
  autoCloseBrackets: true,
  styleActiveLine: true,
  matchBrackets: true,
  lineWrapping: true,
  foldGutter: true,
  autoCloseTags: true,
  viewportMargin: Infinity,
  gutters: [
    'CodeMirror-lint-markers',
    'CodeMirror-foldgutter',
    'CodeMirror-linenumbers'
  ]
};

class ManifestEditor extends Component {
  constructor() {
    super();

    this._refs = {};
  }
  ref(name) {
    return ref => {
      this._refs[name] = ref;
    };
  }
  options({ mode }) {
    const modes = {
      json: {
        name: 'javascript',
        json: true
      },
      yaml: 'yaml'
    };

    return Object.assign({}, options, {
      mode: modes[mode.toLowerCase()]
    });
  }
  render() {
    return (
      <ReactCodeMirror
        ref={this.ref('cm')}
        value={this.props.value || this.props.defaultValue}
        onChange={this.props.onChange}
        onFocusChange={this.props.onFocusChange}
        options={this.options(this.props)}
        autoSave={this.props.autoSave}
        preserveScrollPosition={this.props.preserveScrollPosition}
      />
    );
  }
}

ManifestEditor.defaultProps = {
  mode: 'json',
  defaultValue: '',
  onChange: () => null,
  onFocusChange: () => null,
  autoSave: true,
  preserveScrollPosition: true
};

ManifestEditor.propTypes = {
  mode: PropTypes.oneOf(['json', 'yaml']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  autoSave: PropTypes.bool,
  preserveScrollPosition: PropTypes.bool
};

export default ManifestEditor;
