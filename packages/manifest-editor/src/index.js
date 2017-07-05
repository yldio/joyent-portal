import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/eclipse.css';
import 'codemirror/addon/fold/foldgutter.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/properties/properties';
import 'codemirror/addon/edit/closebrackets';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/fold/foldcode';
import 'codemirror/addon/fold/foldgutter';
import 'codemirror/addon/fold/brace-fold';
import 'codemirror/addon/fold/indent-fold';
import 'codemirror/addon/fold/comment-fold';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/edit/closetag';

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
  options({ mode, readOnly }) {
    const modes = {
      json: {
        name: 'javascript',
        json: true
      },
      yaml: 'yaml',
      ini: 'properties'
    };

    return Object.assign({}, options, {
      mode: modes[mode.toLowerCase()],
      readOnly
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
  preserveScrollPosition: true,
  readOnly: false
};

ManifestEditor.propTypes = {
  mode: PropTypes.oneOf(['json', 'yaml']),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  autoSave: PropTypes.bool,
  preserveScrollPosition: PropTypes.bool,
  readOnly: PropTypes.bool
};

export default ManifestEditor;
