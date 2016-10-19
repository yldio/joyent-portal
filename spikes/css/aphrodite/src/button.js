import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import color from 'color';
import hoverTransition from './mixins/hover-transition';

import variables from './variables.json';
import h3 from './globals/h3'; // this is just to showcase style dependencies (not mixins)

const primaryHover = hoverTransition({
  type: 'button',
  hover: color(variables.color.cta.primary).darken(0.2).rgbString(),
  color: variables.color.cta.primary
});

const secondaryHover = hoverTransition({
  type: 'button',
  hover: color(variables.color.cta.secondary).darken(0.2).rgbString(),
  color: variables.color.cta.secondary
});

const styles = StyleSheet.create({
  button: {
    display: 'block',
    verticalAlign: 'top',
    textTransform: 'capitalize',
    borderRadius: 10,
    margin: 0,
    border: 'none',
    ':hover': {
      textDecoration: 'none'
    },
    ':disabled': {
      color: 'black'
    }
  },
  primary: {
    ...primaryHover,
    color: 'white'
  },
  secondary: {
    ...secondaryHover,
    color: 'black',
    lineHeight: 25
  }
});

const Button = (props) => {
  const {
    className = '',
    children = '',
    primary = true,
    secondary = false
  } = props;

  const _styles = [
    styles.button,
    (primary || !secondary) ? styles.primary : styles.secondary,
    h3 // this is just to showcase style dependencies (not mixins)
  ];

  return (
    <button {...props} className={`${css(..._styles)} ${className}`}>
      {children}
    </button>
  );
};

export default Button;