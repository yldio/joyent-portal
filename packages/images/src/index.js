import React from 'react';
import ReactDOM from 'react-dom';
import isFunction from 'lodash.isfunction';
import isFinite from 'lodash.isfinite';

import { register } from './sw';
import App from './app';

if (!isFunction(Number.isFinite)) {
  Number.isFinite = isFinite;
}

ReactDOM.render(<App />, document.getElementById('root'));

register();
