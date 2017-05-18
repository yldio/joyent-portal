const webpackConfig = require('react-scripts/config/webpack.config.dev.js');
const { defaultHandlers } = require('react-docgen');
const dnHandler = require('react-docgen-displayname-handler');
// Const snapguidist = require('snapguidist');
const path = require('path');

module.exports = {
  webpackConfig: Object.assign(webpackConfig, {
    resolve: Object.assign(webpackConfig.resolve, {
      alias: Object.assign(webpackConfig.resolve.alias, {
        'rsg-components/Wrapper': path.join(__dirname, 'src/styleguide/wrapper')
      })
    }),
    module: Object.assign(webpackConfig.module, {
      rules: webpackConfig.module.rules.map(rule => {
        if (!(rule.loader || '').match(/babel-loader/)) {
          return rule;
        }

        return Object.assign(rule, {
          options: {
            babelrc: true,
            cacheDirectory: true
          }
        });
      })
    })
  }),
  title: 'UI Toolkit',
  sections: [
    // {
    //   name: 'Getting Started',
    //   content: 'src/getting-started.md'
    // },
    // {
    //   name: 'Guidelines',
    //   sections: [
    //     {
    //       name: 'Overview',
    //       content: 'src/guidelines/overview.md'
    //     },
    //     {
    //       name: 'Layout',
    //       content: 'src/guidelines/layout.md'
    //     }
    //   ]
    // },
    {
      name: 'Theme',
      content: 'src/theme/colors.md'
    },
    {
      name: 'Components',
      components: () => [
        'src/anchor/index.js',
        'src/button/index.js',
        'src/card/card.js',
        'src/form/input.js',
        'src/form/checkbox.js',
        'src/form/radio.js',
        'src/form/select.js',
        'src/form/toggle.js',
        'src/list/ul.js',
        'src/list/li.js',
        'src/topology/index.js'
      ]
    },
    {
      name: 'Baseline',
      content: 'src/baseline/readme.md'
    }
    // {
    //   name: 'F.A.Q.',
    //   content: 'src/faq.md'
    // }
  ],
  handlers: componentPath =>
    defaultHandlers.concat(dnHandler.createDisplayNameHandler(componentPath))
};
