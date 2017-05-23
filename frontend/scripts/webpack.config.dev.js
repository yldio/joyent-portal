// @remove-on-eject-begin
/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */
// @remove-on-eject-end
'use strict';

const fs = require('fs');
const path = require('path');
const paths = require('./paths');
const originalConfig = require('./webpack.config.dev.original');

const ROOT = path.join(__dirname, '../../../..');
const UI_ROOT = path.join(ROOT, 'ui');
const FRONTEND_ROOT = process.env.NODE_ENV === 'production'
  ? path.join(__dirname, '../')
  : path.join(ROOT, 'frontend');

const MODULES = [
  path.join(FRONTEND_ROOT, 'node_modules'),
  path.join(UI_ROOT, 'node_modules'),
  'node_modules'
];
const FRONTEND = path.join(FRONTEND_ROOT, 'src'); // duplicate
const UI = process.env.NODE_ENV === 'production'
  ? path.join(FRONTEND_ROOT, 'node_modules', '@tomgco/joyent-portal-ui', 'dist')
  : path.join(UI_ROOT, 'src'); // also duplicate
const STATIC = path.join(FRONTEND_ROOT, 'static');
const ESLINT = path.join(__dirname, '.eslintrc');

// module.exports = originalConfig;

// module.exports = function() {

  console.log('originalConfig = ', originalConfig);
  // return originalConfig;

  // config.module.rules[1].exclude.push(/\.(graphql|gql)$/);

  const rules = originalConfig.module.rules.reduce((loaders, loader, index) => {
    if(loader.test === /\.(js|jsx)$/) {
      loaders.push({
        test: loader.test,
        include: [loader.include, UI],
        loader: loader.loader,
        options: {
          babelrc: false,
          presets: [require.resolve('babel-preset-react-app')],
          plugins: [['inline-react-svg', {
            ignorePattern: 'libre-franklin'
          }]],
          cacheDirectory: true
        }
      })
    }
    else if(index === 1) {
      loaders.push({
        exclude: loader.exclude.concat([/\.(graphql|gql)$/]),
        loader: loader.loader,
        options: loader.options
      })
    }
    else if(loader.include) {
      loaders.push(Object.assign({}, loader, {include: [loader.include, UI]}));
    }
    else {
      loaders.push(loader);
    }
    return loaders;
  }, []);

  rules.push({
    test: /\.(graphql|gql)$/,
    exclude: /node_modules/,
    loader: require.resolve('graphql-tag/loader')
  });

  const aliases = Object.assign({}, originalConfig.resolve.alias, fs.readdirSync(FRONTEND)
    .map((name) => path.join(FRONTEND, name))
    .filter((fullpath) => fs.statSync(fullpath).isDirectory())
    .reduce((aliases, fullpath) => Object.assign(aliases, {
      [`@${path.basename(fullpath)}`]: fullpath
    }), {
      '@root': FRONTEND,
      '@ui': UI
    }));

  const resolveModules = originalConfig.resolve.modules.concat(MODULES);

  originalConfig.module.rules = rules;
  originalConfig.resolve.alias = aliases;
  originalConfig.resolve.modules = resolveModules;
  originalConfig.resolve.plugins = [];

  module.exports = originalConfig;

  // return originalConfig;

  // resolves
  // config.resolveLoader.modules = MODULES;

  // config.resolve.modules = MODULES;

  // set rules and return

// }
