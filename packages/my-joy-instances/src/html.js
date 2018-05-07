const React = require('react');

module.exports = ({
  htmlAttrs = {},
  bodyAttrs = {},
  head = [],
  children = null
}) => (
  <html {...htmlAttrs}>
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="theme-color" content="#1E313B" />

      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />

      {head}
    </head>
    <body {...bodyAttrs}>
      <div id="header" />
      {!children ? <div id="root" /> : null}
      {children}
      <script src="/navigation/static/main.js" />
    </body>
  </html>
);
