const { SSR } = process.env;

const aliases = {};

if (SSR) {
  aliases['^joyent-ui-toolkit/dist/es/editor$'] = './src/mocks/editor';
}

module.exports = aliases;
