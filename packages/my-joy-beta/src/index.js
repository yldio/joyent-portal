import React from 'react';
import ReactDOM from 'react-dom';

import { register } from './sw';
import App from './app';

ReactDOM.render(<App />, document.getElementById('root'));

register();
