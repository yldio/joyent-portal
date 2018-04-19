const { SSR } = process.env;

const aliases = {};

if (SSR) {
  aliases['scroll-to-element'] = './src/mocks/scroll-to-element';
  aliases['^joyent-ui-toolkit/dist/es/editor$'] = './src/mocks/editor';
}

module.exports = aliases;
