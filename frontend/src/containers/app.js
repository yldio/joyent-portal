const React = require('react');
const ReactRedux = require('react-redux');
const ReactRouter = require('react-router');
const Styled = require('styled-components');

const actions = require('@state/actions');
const Article = require('@components/article');
const Base = require('@ui/components/base');
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
  Miss,
  Match
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

    if (!Array.isArray(children)) {
      return children;
    }

    return (
      <Base>
        {children}
      </Base>
    );
  }
}));

module.exports = (props) => {
  return (
    <App {...props}>
      <Header />

      <Nav>
        <OrgNavigation />
      </Nav>
      <Article>
        <Match component={Home} pattern='/:org?/:section?' />
        <Miss component={NotFound} />
      </Article>
      <Footer />
    </App>
  );
};
