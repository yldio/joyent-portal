const React = require('react');
const Loader = require('react-loader');

module.exports = React.createClass({
  fetch: function() {
    const {
      fetch,
      loading,
      loaded
    } = this.props;

    if (fetch && !loading && !loaded) {
      fetch();
    }
  },
  componentDidMount: function() {
    this.fetch();
  },
  componentDidUpdate: function(nextProps) {
    const updated = (
      nextProps.loaded !== this.props.loaded &&
      nextProps.loading !== this.props.loading
    );

    if (!updated) {
      return;
    }

    this.fetch();
  },
  render: function() {
    const {
      loading,
      loaded,
      render,
      children
    } = this.props;

    const _loaded = !loading && !loaded;
    const component = _loaded ? (children || render()) : null;

    return (
      <Loader
        {...this.props}
        loaded={_loaded}
      >
        {component}
      </Loader>
    );
  }
});
