const { NODE_ENV } = process.env;

const env = NODE_ENV === 'production' ? 'prod' : 'dev';

// const resolvePkg = require('resolve-pkg');
const webpackConfig = require(`joyent-react-scripts/config/webpack.config.${env}.js`);
const { defaultHandlers } = require('react-docgen');
const dnHandler = require('react-docgen-displayname-handler');
const path = require('path');

module.exports = {
  editorConfig: {
    theme: 'base16-light'
  },
  pagePerSection: true,
  webpackConfig: Object.assign(webpackConfig, {
    plugins: webpackConfig.plugins.filter(
      plugin => plugin.constructor.name !== 'LodashModuleReplacementPlugin'
    ),
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
      name: 'Principles',
      description:
        'Tritons design language is underpinned by 4 key principles. These principle guide our hand when we are decision making and help us keep our thinking consistent.',
      content: 'src/principles/readme.md'
    },
    {
      name: 'Colors',
      description:
        'Triton’s color palette aim to accessible and clear, whilst making distinctions between elements that are alive and elements that are static. We’ve split our palette into two sections; Action colors and Greys. ',
      content: 'src/theme/colors.md'
    },
    {
      name: 'Typography',
      content: 'src/text/Readme.md',
      description:
        'Triton uses two typographic scales, a large and a small. The large is to be used on breakpoints above 600px, whilst the small is to be used on anything under that. '
    },
    {
      name: 'Grids',
      content: 'src/grids/Readme.md',
      description:
        'Triton’s grid aims to have maximum coverage over a wide range of devices. With a maximum container width of 964px, we are able to display the main desktop experience all the way down to a tradional landscape tablet device.',
      sections: [
        {
          name: 'Horizontal',
          content: 'src/grids/Readme.md'
        },
        {
          name: 'Vertical',
          content: 'src/grids/vertical.md'
        }
      ]
    },
    {
      name: 'Superscript',
      content: 'src/text/Superscript.md',
      description:
        'Superscript is a way of formatting text so they appear above the baseline, drawing more attention to a smaller, less important element of information.'
    },
    {
      name: 'Buttons',
      description:
        'Buttons are the core of any UI kit, and we are no exception. Here we have documented to most basic variations of the button states, which include but are limited to; Default, Hover, Clicked, and Disabled. ',
      content: 'src/button/Readme.md'
    },
    {
      name: 'Special Buttons',
      description:
        'Icon buttons are to be used to illustrate important actions and for when we are redirecting users to seperate services such as Github. ',
      content: 'src/button/Special.md'
    },
    {
      name: 'Basic Components',
      components: () => [
        'src/form/input.js',
        'src/form/radio.js',
        'src/form/select.js',
        'src/form/checkbox.js',
        'src/tooltip/index.js',
        'src/popover/index.js'
      ]
    },
    {
      name: 'Tags',
      content: 'src/tags/Readme.md',
      description:
        'Tags are used to identify instances and services provided by Triton. Our tag style is derived from our small button style, but it’s inlaid text is written to represent the key:value function of the tagging system.'
    },
    {
      name: 'Cards',
      content: 'src/card/demo.md',
      description:
        'Cards are the most widely used component within the current Triton designs. They are used to divide, compartmentalize, and sort information and components that are related. Our card style uses a white background with a Grey 3 border. In some cases we attach a header to cards with either a white background, a coloured background to denote an active status, or a grey background for inactive status.'
    },
    {
      name: 'Tables',
      content: 'src/table/Readme.md',
      description:
        'Tritons uses tables throughout the service in a number of different ways. Tables can be used to list multiple variations of simgle information types, such as instqance lists, snapshots, and package types. Tables can either be multiple select (checkbox) or single select (radio button) and both variations are shown below.'
    },
    {
      name: 'Compound Components',
      components: () => ['src/message/index.js']
    },
    {
      name: 'Toasts',
      content: 'src/footer/sticky.md',
      description:
        'Toast’s are pop-up that stick to the bottom of the page. Within Triton they are primarily used to contain contextual actions, such as ‘Deploy Instance’ and ‘Delete Instance’. They can also be used to contain universally relevant information like cookies.'
    },
    {
      name: 'Navigation',
      content: 'src/navigation.md',
      description:
        'These elements of navigation across are unoversal across the entire Tiron ecosystem. The primary nav allows users to switch service consoles and data centers, the breadcrumb orientates users within the specific console they’re in, and the footer provides universally important reference information like T’s & C’s.'
    },
    {
      name: 'Sub-section Navigation',
      content: 'src/section-list/usage.md',
      description:
        'We provide users with a number of ways to navigate around sections and consoles. Apart from the breadcrumb which is detailed above, we also provide a tabs components that can be embedded throughout the service..'
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
