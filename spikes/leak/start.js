const cp = require('child_process');

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
    console.log('node src/index.js');
    return cp.exec('node src/index.js', {
      cwd: __dirname
    })
  },
  artillery: () => {
    console.log(`./node_modules/.bin/artillery run ${__dirname}/artillery-${MODE}.yml`);
    return cp.exec(`./node_modules/.bin/artillery run ${__dirname}/artillery-${MODE}.yml`)
  }
})[TYPE];

if (!handler) {
  console.error(`No handler for ${TYPE}`);
  process.exit(1);
}

handler().stdout.pipe(process.stdout);
handler().stderr.pipe(process.stderr);
process.stdin.pipe(handler().stdin);
