import React, { Component } from 'react';
import ReactCodeMirror from 'react-codemirror';
import PropTypes from 'prop-types';

class ManifestEditor extends Component {
  constructor({ value, defaultValue }) {
    super();

    this._refs = {};
  }
  ref(name) {
    return ref => {
      this._refs[name] = ref;
    };
  }
  options({ mode, theme, keyMap }) {
    const modes = {
      json: {
        name: 'javascript',
        json: true
      },
      yaml: 'yaml'
    };

    return {
      mode: modes[mode.toLowerCase()],
      theme,
      indentUnit: 2,
      smartIndent: true,
      tabSize: 2,
      indentWithTabs: false,
      electricChars: true,
      keyMap,
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
        'CodeMirror-linenumbers',
        'CodeMirror-foldgutter'
      ]
    };
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
  theme: 'eclipse',
  defaultValue: '',
  onChange: () => null,
  onFocusChange: () => null,
  autoSave: true,
  preserveScrollPosition: true,
  keyMap: 'sublime'
};

ManifestEditor.propTypes = {
  mode: PropTypes.oneOf(['json', 'yaml']),
  theme: PropTypes.oneOf([
    '3024-day',
    '3024-night',
    'abcdef',
    'ambiance-mobile',
    'ambiance',
    'base16-dark',
    'base16-light',
    'bespin',
    'blackboard',
    'cobalt',
    'colorforth',
    'dracula',
    'duotone-dark',
    'duotone-light',
    'eclipse',
    'elegant',
    'erlang-dark',
    'hopscotch',
    'icecoder',
    'isotope',
    'lesser-dark',
    'liquibyte',
    'material',
    'mbo',
    'mdn-like',
    'midnight',
    'monokai',
    'neat',
    'neo',
    'night',
    'panda-syntax',
    'paraiso-dark',
    'paraiso-light',
    'pastel-on-dark',
    'railscasts',
    'rubyblue',
    'seti',
    'solarized',
    'the-matrix',
    'tomorrow-night-bright',
    'tomorrow-night-eighties',
    'ttcn',
    'twilight',
    'vibrant-ink',
    'xq-dark',
    'xq-light',
    'yeti',
    'zenburn'
  ]),
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocusChange: PropTypes.func,
  autoSave: PropTypes.bool,
  preserveScrollPosition: PropTypes.bool,
  keyMap: PropTypes.oneOf(['sublime', 'vim', 'emacs'])
};

export default ManifestEditor;
