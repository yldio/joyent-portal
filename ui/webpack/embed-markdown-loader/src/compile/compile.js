const webpack = require('webpack');
const MemoryFS = require('memory-fs');
const clone = require('lodash.clonedeep');
const path = require('path');

const getCompiler = ({
  filename,
  mfs,
  config
}) => {
  const compiler = webpack(config);

  compiler.outputFileSystem = mfs;

  compiler.inputFileSystem.stat = function(path, callback) {
    this._statStorage.provide(path, (path, callback) => {
      if (path === filename) {
        return mfs.stat(path, callback);
      }

      this._stat(path, callback);
    }, callback);
  };

  compiler.inputFileSystem.readFile = function(path, callback) {
    this._readFileStorage.provide(path, (path, callback) => {
      if (path === filename) {
        return mfs.readFile(path, callback);
      }

      this._readFile(path, callback);
    }, callback);
  };

  return compiler;
};

module.exports = ({
  source,
  entrypoint,
  config
}, fn) => {
  const name = path.basename(entrypoint);
  const _filename = path.resolve(config.context, entrypoint);
  const _dirname = path.dirname(_filename);

  const mfs = new MemoryFS();

  mfs.mkdirpSync('/static');
  mfs.mkdirpSync(_dirname);
  mfs.writeFileSync(_filename, source);

  const compiler = getCompiler({
    filename: _filename,
    mfs,
    config: Object.assign(clone(config), {
      target: 'node',
      output: {
        path: '/static',
        filename: name
      },
      entry: [
        `./${path.relative(config.context, _filename)}`
      ]
    })
  });

  compiler.run((err, stats) => {
    if (err) {
      return fn(err);
    }

    const errors = stats.toJson().errors;

    if (errors && errors.length) {
      return fn(errors);
    }

    mfs.readFile(`/static/${name}`, (err, res) => {
      if (err) {
        return fn(err);
      }

      let style = mfs.readdirSync('/static').filter((file) => {
        return /\.css$/.test(file);
      }).map((file) => {
        try {
          return mfs.readFileSync(`/static/${file}`, 'utf-8');
        } catch (err) {
          return '';
        }
      }).concat('\n');

      fn(err, {
        body: (res && res.toString) ? res.toString() : res,
        style
      });
    });
  });
};
