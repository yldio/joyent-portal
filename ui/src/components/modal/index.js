const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Modal = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  handleReveal: function(e) {
    e.preventDefault();
    this.setState({
      active: true
    });
  },

  render: function() {
    const {
      children,
      className,
      name
    } = this.props;

    const modal = classNames(
      className,
      styles.modal,
      this.state.active ? styles['modal-active'] : ''
    );

    const overlay = classNames(
      className,
      styles.overlay,
      this.state.active ? styles['overlay-active'] : ''
    );

    return (
      <div>
        <a
          aria-label={name}
          onClick={this.handleReveal}
          tabIndex={0}
        >
          Click me to reveal modal
        </a>

        <div className={overlay} />
        <section aria-label={name} className={modal} >
          <span className={styles.close}>X</span>
          <h2>This is the Modal</h2>
          {children}
        </section>
      </div>
    );
  }
});

module.exports = Modal;
