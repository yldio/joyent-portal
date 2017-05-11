import NProgress from 'nprogress';
import Head from 'next/head';
import Router from 'next/router';
import Article from './article';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

export default ({ children, title = '' }) => (
  <main>
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />

      <link rel="stylesheet" type="text/css" href="/static/nprogress.css" />
      <link rel="stylesheet" type="text/css" href="/static/codemirror.css" />
      <link rel="stylesheet" type="text/css" href="/static/eclipse.css" />
      <link rel="stylesheet" type="text/css" href="/static/foldgutter.css" />

      <style jsx global>{`
        html, body {
          margin: 0;
          padding: 0;
          font-family: Helvetica;
        }
      `}</style>
    </Head>
    <Article>
      {children}
    </Article>
  </main>
);
