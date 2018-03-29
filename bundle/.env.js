'use strict';

const { homedir } = require('os');
const { join } = require('path');

const { SDC_KEY_PATH } = process.env;

process.env.SDC_KEY_PATH = SDC_KEY_PATH || join(homedir(), './.ssh/id_rsa');
