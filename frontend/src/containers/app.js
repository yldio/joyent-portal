import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { injectGlobal } from 'styled-components';
import { updateRouter } from '@state/actions';
import Article from '@components/article';
import Base, { global } from '@ui/components/base';
import BaselineGrid from '@ui/components/baseline-grid';
import Footer from '@components/footer';
import Header from '@containers/header';
import Home from '@containers/home';
import NotFound from '@containers/not-found';
import Nav from '@components/navigation';
import OrgNavigation from '@components/navigation/org';

const App = connect()(React.createClass({
  displayName: 'App',
  propTypes: {
    children: React.PropTypes.node,
    dispatch: React.PropTypes.func,
    router: React.PropTypes.object
  },
  componentWillMount: function() {
    const {
      router,
      dispatch
    } = this.props;

    // ugly hack needed because of a limitation of react-router api
    // that doens't pass it's instance to matched routes
    // wait for react-router-redux@5
    dispatch(updateRouter(router));

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

    if (process.env.NODE_ENV !== 'production' && process.env.BASELINE_GRID) {
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
);
