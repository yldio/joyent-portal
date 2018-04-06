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
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
      />
      <meta name="theme-color" content="#1E313B" />

      {head}
    </head>
    <body {...bodyAttrs}>
      <div id="header" />
      {children ? null : <div id="root" />}
      {children}
      <script src="/navigation/static/main.js" />
    </body>
  </html>
);
