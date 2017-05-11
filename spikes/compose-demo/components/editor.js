import React, { Component } from 'react';
import ReactCodeMirror from 'react-codemirror';

import YamlMode from 'codemirror/mode/yaml/yaml';
// eslint-disable-next-line no-unused-vars
import KeyMap from 'codemirror/keymap/sublime';
// eslint-disable-next-line no-unused-vars
// import Lint from 'codemirror/addon/edit/lint';
// eslint-disable-next-line no-unused-vars
import CloseBrackets from 'codemirror/addon/edit/closebrackets';
// eslint-disable-next-line no-unused-vars
import MatchBrackets from 'codemirror/addon/edit/matchbrackets';
// eslint-disable-next-line no-unused-vars
import FoldCode from 'codemirror/addon/fold/foldcode';
// eslint-disable-next-line no-unused-vars
import FoldGutter from 'codemirror/addon/fold/foldgutter';
// eslint-disable-next-line no-unused-vars
import BraceFold from 'codemirror/addon/fold/brace-fold';
// eslint-disable-next-line no-unused-vars
import IndentFold from 'codemirror/addon/fold/indent-fold';
// eslint-disable-next-line no-unused-vars
import CommentFold from 'codemirror/addon/fold/comment-fold';
// eslint-disable-next-line no-unused-vars
import ActiveLine from 'codemirror/addon/selection/active-line';
// eslint-disable-next-line no-unused-vars
import CloseTag from 'codemirror/addon/edit/closetag';

const options = {
  mode: {
    name: 'javascript',
    json: true
  },
  theme: 'eclipse',
  indentUnit: 2,
  smartIndent: true,
  tabSize: 2,
  indentWithTabs: false,
  electricChars: true,
  keyMap: 'sublime',
  lineNumbers: true,
  inputStyle: 'contenteditable',
  readOnly: false,
  autoCloseBrackets: true,
  styleActiveLine: true,
  matchBrackets: true,
  lineWrapping: true,
  foldGutter: true,
  autoCloseTags: true,
  viewportMargin: Infinity,
  gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter']
};

class Editor extends Component {
  constructor() {
    super();

    this._refs = {};

    this.state = {
      code: manifest.trim()
    };

    this.handleOnChange = this.handleOnChange.bind(this);
  }
  handleOnChange(newCode) {
    this.setState({
      code: newCode
    });
  }
  ref(name) {
    return ref => {
      this._refs[name] = ref;
    };
  }
  render() {
    return (
      <ReactCodeMirror
        ref={this.ref('cm')}
        value={this.state.code}
        onChange={this.handleOnChange}
        onFocusChange={this.handleOnFocusChange}
        options={options}
        autoSave
        preserveScrollPosition
      />
    );
  }
}

export default Editor;
