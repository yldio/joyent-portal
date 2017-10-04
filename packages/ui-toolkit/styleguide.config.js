const webpackConfig = require('react-scripts/config/webpack.config.dev.js');
const { defaultHandlers } = require('react-docgen');
const dnHandler = require('react-docgen-displayname-handler');
const snapguidist = require('snapguidist');
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
            cacheDirectory: false
          }
        });
      })
    })
  }),
  title: 'UI Toolkit',
  sections: [
    {
      name: 'Get Started',
      sections: [
        {
          name: 'Overview',
          content: 'src/overview.md'
        },
        {
          name: 'Download',
          content: 'src/download.md'
        },
        {
          name: 'Contribute',
          content: 'src/contribute.md'
        },
        {
          name: 'Support',
          content: 'src/support.md'
        },
        {
          name: 'FAQ',
          content: 'src/faq.md'
        }
      ]
    },
    {
      name: 'Base',
      sections: [
        {
          name: 'Typography',
          content: 'src/text/Readme.md'
        },
        {
          name: 'Baseline',
          content: 'src/baseline/readme.md'
        },
        {
          name: 'Colors',
          content: 'src/theme/colors.md'
        }
      ]
    },
    {
      name: 'Components',
      components: () => [
        'src/button/index.js',
        'src/breadcrumb/index.js',
        'src/card/card.js',
        'src/form/input.js',
        'src/form/number-input.js',
        'src/form/checkbox.js',
        'src/dropdown/index.js',
        'src/progress-bar/index.js',
        'src/form/radio.js',
        'src/form/select.js',
        'src/form/toggle.js',
        'src/header/index.js',
        'src/section-list/index.js',
        'src/topology/index.js',
        'src/tooltip/tooltip.js',
        'src/close-button/index.js',
        'src/icon-button/index.js',
        'src/message/index.js',
        'src/slider/index.js',
        'src/icons/icons.js'
      ]
    }
  ],
  theme: {
    color: {
      base: '#494949',
      link: '#3B46CC',
      linkHover: '#5a62c5'
    },
    fontSize: {
      base: 15,
      text: 15,
      small: 13,
      h1: 36,
      h2: 30,
      h3: 26,
      h4: 15,
      h5: 14,
      h6: 12
    },
    fontFamily: {
      base: '"Libre Franklin", -apple-system, cursive'
    }
  },
  styles: {
    Logo: {
      logo: {
        'text-indent': -999,
        'background-image': 'url("./etc/joyent-white.png")',
        'background-size': 'cover',
        width: 180,
        'background-position': 0,
        height: 39,
        padding: 0,
        margin: 0
      }
    }
  },
  handlers: componentPath =>
    defaultHandlers.concat(dnHandler.createDisplayNameHandler(componentPath))
};
