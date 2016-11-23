const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const Modal = React.createClass({

  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    name: React.PropTypes.string,
    trigger: React.PropTypes.func.isRequired
  },

  getInitialState: function() {
    return {
      active: false
    };
  },

  handleReveal: function(e) {
    e.preventDefault();
    this.setState({
      active: this.state.active ? false : true
    });
  },

  render: function() {
    const {
      children,
      className,
      name,
      trigger
    } = this.props;

    const {
      active
    } = this.state;

    const {
      handleReveal
    } = this;

    const triggerClass = classNames(
      className,
      styles.trigger
    );

    const modal = classNames(
      className,
      styles.modal,
    );

    const overlay = classNames(
      className,
      styles.overlay,
    );

    return (
      <div>
        <span
          aria-label={name}
          className={triggerClass}
          href="#"
          onClick={handleReveal}
          role="link"
          tabIndex={0}
        >
          {trigger()}
        </span>

        { active ? (
          <div
            aria-label="overlay"
            className={overlay}
            onClick={handleReveal}
            role="link"
            tabIndex={-2}
          />
        ) : null }

        { active ? (
          <div aria-label={name} className={modal} >
            <button
              className={styles.close}
              href='#'
              onClick={handleReveal}
              role="dialog"
              tabIndex={-1}
            >X</button>
            {children}
          </div>
        ) : null }
      </div>
    );
  }
});

module.exports = Modal;
