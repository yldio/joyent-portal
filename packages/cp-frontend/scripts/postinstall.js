const { readFile, writeFile, exists } = require('mz/fs');
const main = require('apr-main');
const path = require('path');

// TODO: this will need to happen for prod and test too

const enhancedConfigPath = path.join(__dirname, './webpack.config.dev.js');

const configPath = path.join(
  __dirname,
  '../node_modules/react-scripts/config/webpack.config.dev.js'
);
const orignalConfigPath = path.join(
  __dirname,
  '../node_modules/react-scripts/config/webpack.config.dev.original.js'
);

main((async () => {
  const orignalConfigPathExists = await exists(orignalConfigPath);

  if (!orignalConfigPathExists) {
    const orignalConfig = await readFile(configPath, 'utf-8');
    await writeFile(orignalConfigPath, orignalConfig);
  }

  const enhancedConfig = await readFile(enhancedConfigPath);
  await writeFile(configPath, enhancedConfig)
})());
