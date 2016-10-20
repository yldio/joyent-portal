const path = require('path');
const thenify = require('thenify');
const fs = require('fs');
const Ncp = require('ncp');

const readdir = thenify(fs.readdir);
const writeFile = thenify(fs.writeFile);
const ncp = thenify(Ncp.ncp);

const root = path.join(__dirname, '../locales');
const sttic = path.join(__dirname, '../static/locales');
const intl = path.join(__dirname, '../node_modules/react-intl/locale-data');

const source = ({
  name,
  json
}) => `
  (() => {
    const Locales = window.Locales || {};
    Locales['${name}'] = ${json};
    window.Locales = Locales;
  })();
`;

const compile = async () => {
  const files = await readdir(root);
  const jsons = files.filter(filename => path.extname(filename) === '.json');

  const locales = jsons.reduce((res, filename) => {
    const name = path.parse(filename).name;
    const json = JSON.stringify(require(path.join(root, filename)));
    const lang = name.split(/\-/)[0];

    return {
      ...res,
      [name]: {
        lang,
        json,
        filename
      }
    };
  }, {});

  await Promise.all(Object.keys(locales).map((name) => {
    console.log(`Copying locale-data for ${name}`);

    const locale = locales[name];
    const source = path.join(intl, `${locale.lang}.js`);
    const destination = path.join(sttic, `${locale.lang}.js`);

    return ncp(source, destination);
  }));

  return await Promise.all(Object.keys(locales).map((name) => {
    console.log(`Writing ${name}.js`);

    const locale = locales[name];

    return writeFile(path.join(sttic, `${name}.js`), source({
      ...locale,
      name
    }));
  }));
};

console.log('Building Locales');
compile().then(() => {
  console.log('Locales Built');
}, (err) => {
  throw err;
});
