const webpackConfig = require('react-scripts/config/webpack.config.dev.js');
const { defaultHandlers } = require('react-docgen');
const dnHandler = require('react-docgen-displayname-handler');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const path = require('path');

module.exports = {
  highlightTheme: 'base16-light',
  require: [path.join(__dirname, 'etc/style.css')],
  webpackConfig: Object.assign(webpackConfig, {
    resolve: Object.assign(webpackConfig.resolve, {
      alias: Object.assign(webpackConfig.resolve.alias, {
        'rsg-components/Wrapper': path.join(__dirname, 'src/styleguide/wrapper')
      })
    }),
    plugins:[
      new UglifyJSPlugin(),
      new LodashModuleReplacementPlugin()
    ],
    module: Object.assign(webpackConfig.module, {
      rules: [
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader']
        },
        {
          test: /\.(eot|ttf|woff|woff2)$/,
          use: [
            {
              loader: 'file-loader'
            }
          ]
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'static/media/[name].[hash:8].[ext]'
          }
        }
      ]
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
        'src/breadcrumb/index.js',
        'src/button/index.js',
        'src/card/card.js',
        'src/form/checkbox.js',
        'src/header/index.js',
        'src/icons/icons.js',
        'src/form/input.js',
        'src/message/index.js',
        'src/progress-bar/index.js',
        'src/form/radio.js',
        'src/section-list/index.js',
        'src/form/select.js',
        'src/form/toggle.js'
      ]
    }
  ],
  theme: {
    color: {
      base: '#494949',
      link: '#3B46CC',
      linkHover: '#5a62c5',
      sidebarBackground: '#1E313B'
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
      base: ['"Libre Franklin", -apple-system, sans-serif'],
      monospace: [
        'Roboto Mono',
        'Consolas',
        '"Liberation Mono"',
        'Menlo',
        'monospace'
      ]
    },
    sidebarWidth: 300,
    spaceFactor: 6
  },
  styles: {
    Styleguide: {
      sidebar: {
        color: '#FFFFFF'
      }
    },
    Logo: {
      border: 'none',
      logo: {
        'text-indent': -999,
        'background-image': 'url("./etc/joyent-white.png")',
        'background-size': 'cover',
        width: 180,
        'background-position': 0,
        height: 39,
        padding: 0,
        margin: '0 auto'
      }
    }
  },
  handlers: componentPath =>
    defaultHandlers.concat(dnHandler.createDisplayNameHandler(componentPath))
};
