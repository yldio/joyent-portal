/* After some time tring to make this work without messing w/ checked property,
 * I ended up using it *only* when none is defined
 *
 * This way we try to be as pure as possible and not mess with consumer's logic
 * if they have any
 */

const first = require('lodash.first');
const isUndefined = require('lodash.isundefined');
const get = require('lodash.get');
const Item = require('./item');
const find = require('lodash.find');
const classNames = require('classnames');
const React = require('react');
const styles = require('./style.css');

const RadioGroup = React.createClass({
  propTypes: {
    children: React.PropTypes.node,
    className: React.PropTypes.string,
    id: React.PropTypes.string,
    name: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func,
    style: React.PropTypes.object
  },
  getInitialState: function() {
    return this.getState(this.props);
  },
  componentWillReceiveProps: function(nextProps) {
    return this.setState(nextProps);
  },
  getState: function(props) {
    const _children = React.Children.toArray(props.children).filter((child) => {
      return get(child, 'type.displayName') === 'Radio';
    });

    const hasChecked = _children.some((child) => {
      return !isUndefined(get(child, 'props.checked'));
    });

    if (hasChecked) {
      return {
        hasChecked
      };
    }

    const defaultChecked = get(find(_children, (child) => {
      return get(child, 'props.defaultChecked');
    }), 'props.value');

    const checked = (() => {
      const stateChecked = get(this, 'state.checked');
      const fallback = isUndefined(defaultChecked)
        ? get(first(_children), 'props.value')
        : defaultChecked;

      return !isUndefined(stateChecked) ? stateChecked : fallback;
    })();

    return {
      checked
    };
  },
  handleChange: function(key) {
    return (ev) => {
      const {
        onChange = () => {}
      } = this.props;

      this.setState({
        checked: key
      }, () => {
        onChange(ev);
      });
    };
  },
  render: function() {
    const {
      name,
      children,
      className,
      id,
      style
    } = this.props;

    const {
      hasChecked,
      checked
    } = this.state;

    const {
      handleChange
    } = this;

    const cn = classNames(
      className,
      styles.group
    );

    const _children = React.Children.map(children, (child, i) => {
      if (child.type.name !== 'Radio') {
        return child;
      }

      const tabIndex = i + 1;
      const disabled = get(child, 'props.disabled');
      const value = get(child, 'props.value');

      const _handleChange = (!hasChecked && !disabled)
        ? handleChange(value)
        : undefined;

      const _child = hasChecked ? (
        React.cloneElement(child, {
          name
        })
      ) : (
        React.cloneElement(child, {
          onChange: _handleChange,
          checked: value === checked,
          defaultChecked: undefined,
          name
        })
      );

      const _checked = get(_child, 'props.checked');

      return (
        <Item
          checked={_checked}
          disabled={disabled}
          onClick={_handleChange}
          tabIndex={tabIndex}
        >
          {_child}
        </Item>
      );
    });

    return (
      <div
        className={cn}
        id={id}
        style={style}
      >
        {_children}
      </div>
    );
  }
});

module.exports = RadioGroup;
