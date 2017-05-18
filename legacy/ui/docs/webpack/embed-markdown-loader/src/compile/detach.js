const spawn = require('child_process').spawn;
const path = require('path');

const executable = path.join(__dirname, 'detached.js');

module.exports = ({
  source,
  entrypoint,
  configFullpath
}, fn) => {
  let out = '';
  let err = '';

  const child = spawn('node', [
    executable,
    `--entrypoint=${entrypoint}`,
    `--config=${configFullpath}`
  ]);

  child.stdin.write(source);
  child.stdin.end();

  child.stdout.on('data', (data) => {
    out += data;
  });

  child.stderr.on('data', (data) => {
    err += data;
  });

  child.on('close', (code) => {
    if (code !== 0) {
      return fn(new Error(err));
    }

    const res = {
      style: '',
      body: ''
    };

    try {
      const _res = JSON.parse(out);
      res.style = _res.style;
      res.body = _res.body;
    } catch(err) {
      console.error(err);
    }

    fn(null, res);
  });
};