const cp = require('child_process');
const path = require('path');

const TYPE = process.env.TYPE;
const MODE = process.env.MODE;

if (!TYPE) {
  console.error(`
Usage: TYPE={type} node start.js
       TYPE=node node start.js
  `.trim());

  process.exit(1);
}

const handler = ({
  node: () => {
    const root = path.join(__dirname, '../');
    const script = path.join(root, 'src/server/index.js');
    return cp.exec(`node ${script}`, {
      cwd: __dirname
    });
  },
  artillery: () => {
    const conf = path.join(__dirname, '../artillery/artillery-${MODE}.yml');
    return cp.exec(`../node_modules/.bin/artillery run ${conf}`);
  }
})[TYPE];

if (!handler) {
  console.error(`No handler for ${TYPE}`);
  process.exit(1);
}

handler().stdout.pipe(process.stdout);
handler().stderr.pipe(process.stderr);
process.stdin.pipe(handler().stdin);
