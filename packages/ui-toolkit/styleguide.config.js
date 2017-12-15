const { NODE_ENV } = process.env;

const env = NODE_ENV === 'production' ? 'prod' : 'dev';

// const resolvePkg = require('resolve-pkg');
const webpackConfig = require(`joyent-react-scripts/config/webpack.config.${env}.js`);
const { defaultHandlers } = require('react-docgen');
const dnHandler = require('react-docgen-displayname-handler');
const path = require('path');

module.exports = {
  highlightTheme: 'base16-light',
  require: [path.join(__dirname, 'etc/style.css')],
  webpackConfig: Object.assign(webpackConfig, {
    resolve: Object.assign(webpackConfig.resolve, {
      alias: Object.assign(webpackConfig.resolve.alias, {
        'rsg-components/Wrapper': path.join(__dirname, 'src/styleguide/wrapper')
      })
    })
  }),
  styleguideComponents: {
    StyleGuideRenderer: path.join(__dirname, 'src/styleguide/renderer'),
    TableOfContentsRenderer: path.join(__dirname, 'src/styleguide/sidebar'),
    ReactComponentRenderer: path.join(__dirname, 'src/styleguide/component'),
    PlaygroundRenderer: path.join(__dirname, 'src/styleguide/playground'),
    TabButtonRenderer: path.join(__dirname, 'src/styleguide/tabs'),
    SectionHeadingRenderer: path.join(
      __dirname,
      'src/styleguide/sectionHeading'
    ),
    SectionRenderer: path.join(__dirname, 'src/styleguide/section')
  },
  title: 'Design System',
  showCode: true,
  sections: [
    {
      name: 'Base Language',
      sections: [
        {
          name: 'Color Palette',
          description:
            'Triton’s color palette aim to accessible and clear, whilst making distinctions between elements that are alive and elements that are static. We’ve split our palette into two sections; Action colors and Greys. ',
          content: 'src/theme/colors.md'
        },
        {
          name: 'Typography',
          content: 'src/text/Readme.md'
        }
      ]
    },
    {
      name: 'Basic Components',
      components: () => [
        'src/button/index.js',
        'src/form/input.js',
        'src/form/radio.js',
        'src/form/select.js',
        'src/form/checkbox.js',
        'src/form/toggle.js',
        'src/card/card.js',
        'src/tooltip/index.js',
        'src/popover/index.js'
      ]
    },
    {
      name: 'Compound Components',
      components: () => [
        'src/table/index.js',
        'src/header/index.js',
        'src/message/index.js',
        'src/section-list/index.js',
        'src/breadcrumb/index.js',
        'src/progress-bar/index.js'
      ]
    },
    {
      name: 'Assets',
      sections: [
        {
          name: 'Section Iconography',
          content: 'src/icons/section.md'
        },
        {
          name: 'Functional Iconography',
          content: 'src/icons/functional.md'
        }
      ]
    },
    {
      name: 'Developer',
      sections: [
        {
          name: 'Download',
          content: 'src/download.md'
        },
        {
          name: 'Contribute',
          content: 'src/contribute.md'
        },
        {
          name: 'FAQ',
          content: 'src/faq.md'
        }
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
