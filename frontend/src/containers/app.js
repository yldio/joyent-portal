import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import Article from '@components/article';
import Base, { global } from '@ui/components/base';
import BaselineGrid from '@ui/components/baseline-grid';
import Footer from '@components/footer';
import Header from '@containers/header';
import Home from '@containers/home';
import NotFound from '@containers/not-found';
import Nav from '@components/navigation';
import OrgNavigation from '@components/navigation/org';
import { isProduction } from '@utils';
import PerfProfiler from '@perf-profiler';
import React from 'react';

const App = connect()(React.createClass({
  propTypes: {
    children: React.PropTypes.node
  },
  componentWillMount: function() {
    injectGlobal`
      ${global}
    `;
  },
  render: function() {
    const {
      children
    } = this.props;

    let _children = children;

    if (!Array.isArray(_children)) {
      return _children;
    }

    if ( !isProduction() && process.env.BASELINE_GRID) {
      _children = (
        <BaselineGrid>
          {_children}
        </BaselineGrid>
      );
    }

    return (
      <Base>
        {_children}
      </Base>
    );
  }
}));

export default (props) => (
  <div>
    { !isProduction() && <PerfProfiler /> }

    <App {...props}>
      <Header />
      <Nav name='application-org-navigation'>
        <OrgNavigation />
      </Nav>
      <Article name='application-content'>
        <Switch>
          <Route component={Home} path='/:org?/:section?' />
          <Route component={NotFound} />
        </Switch>
      </Article>
      <Footer name='application-footer' />
    </App>
  </div>
);
