const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router-dom');
const Styled = require('styled-components');

const actions = require('@state/actions');
const Article = require('@components/article');
const Base = require('@ui/components/base');
const BaselineGrid = require('@ui/components/baseline-grid');
const Footer = require('@components/footer');
const Header = require('@containers/header');
const Home = require('@containers/home');
const NotFound = require('@containers/not-found');
const Nav = require('@components/navigation');
const OrgNavigation = require('@components/navigation/org');

const {
  updateRouter
} = actions;

const {
  connect
} = ReactRedux;

const {
  Switch,
  Route
} = ReactRouter;

const {
  injectGlobal
} = Styled;

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
      ${Base.global}
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

module.exports = (props) => (
  <App {...props}>
    <Header />
    <Nav name="application-org-navigation">
      <OrgNavigation />
    </Nav>
    <Article name="application-content">
      <Switch>
        <Route component={Home} path='/:org?/:section?' />
        <Route component={NotFound} />
      </Switch>
    </Article>
    <Footer name="application-footer" />
  </App>
);
