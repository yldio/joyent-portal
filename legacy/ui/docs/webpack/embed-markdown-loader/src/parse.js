const async = require('async');
const Remarkable = require('remarkable');
const compile = require('./compile');
const evaluate = require('./eval');
const uuid = require('uuid').v4;

const templates = {
  plain: (style, body) => `
    <style>${style}</style>
    ${body}
  `,
  iframe: (style, body) => {
    const _body = body.replace(/"/g, '\'');

    return `
      <iframe srcdoc="
        <html>
        <style>${style}</style>
        <body>${_body}</body>">
      </iframe>
    `;
  },
  shadow: (style, body) => {
    const id = uuid();
    const script = `(function() {
      const element = document.getElementById('${id}').attachShadow({
        mode: 'closed'
      });

      const template = document.getElementById('${id}-template');
      element.appendChild(document.importNode(template.content, true));
    })();`;

    return `
      <div id="${id}"></div>
      <template id="${id}-template">
        ${templates.plain(style, body)}
      </template>
      <script>${script}</script>
    `;
  }
};


module.exports = ({
  mode = 'shadow',
  fullname,
  source,
  config = {}
}, fn) => {
  const instance = new Remarkable(config.renderer);

  const {
    parse,
    renderer,
    options
  } = instance;

  const entrypoint = fullname.replace(/\.md$/, '.js');
  const tokens = parse.call(instance, source, options, {});

  async.map(tokens, (token, fn) => {
    if ((token.type !== 'fence') || (token.params !== 'embed')) {
      return fn(null, token);
    }

    compile({
      source: token.content,
      config: config.webpack,
      entrypoint
    }, (err, {
      body,
      style
    }) => {
      if (err) {
        return fn(err);
      }

      const evaluated = evaluate({
        entrypoint,
        source: body
      });

      const content = templates[mode](style, evaluated);

      return fn(null, {
        type: 'htmlblock',
        content
      });
    });
  }, (err, tokens) => {
    if (err) {
      return fn(err);
    }

    fn(err, renderer.render.call(instance.renderer, tokens, options, {}));
  });
};
