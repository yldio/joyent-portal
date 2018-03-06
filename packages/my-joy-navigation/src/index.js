import React from 'react';
import ReactDOM from 'react-dom';
import stickybits from 'stickybits';

import App from './app';

ReactDOM.render(<App />, document.getElementById('header'));

stickybits('#header');
