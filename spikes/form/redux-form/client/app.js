const React = require('react');
const Styled = require('styled-components');
const ReactRouter = require('react-router');

const {
  default: styled
} = Styled;

const {
  Link
} = ReactRouter;

const Centered = styled.div`
  width: 300px;
  margin: 20px auto;
  text-align: center;
`;

const PrettyLink = styled(Link)`
  text-transform: uppercase;
  padding: 0 10px;
  text-decoration: none;
`;

const App = React.createClass({
  render: function() {
    const {
      children
    } = this.props;

    return (
        <div>
          <Centered>
            <PrettyLink to="form" activeStyle={{ fontWeight: "bold" }}>Form</PrettyLink>
            <PrettyLink to="form-one" activeStyle={{ fontWeight: "bold" }}>Multi page form</PrettyLink>
            <PrettyLink to="form-normalize" activeStyle={{ fontWeight: "bold" }}>Normalize form</PrettyLink>
          </Centered>
          <div>
          { children }
          </div>
        </div>
    );
  }
});

const Home = ({}) => <Centered><p>Select a form!</p></Centered>;

module.exports = {
  App,
  Home
};
