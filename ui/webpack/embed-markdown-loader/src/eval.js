const Module = require('module');
const vm = require('vm');
const path = require('path');

module.exports = ({
  source,
  entrypoint
}) => {
  const script = vm.createScript(source, entrypoint);
  const dirname = path.basename(entrypoint);
  const rootName = path.join(dirname, '@root');

  const _module = new Module(rootName);

  _module.filename = rootName;
  _module.paths = Module._nodeModulePaths(dirname);

  script.runInNewContext({
    nmodule: _module,
    nrequire: _module.require,
    __filename: entrypoint,
    __dirname: dirname,
    process,
    console,
    Buffer
  });

  return _module.exports;
};
