const constants = require('../../shared/constants');
const fncs = require('../../shared/functions');

const Styled = require('styled-components');

const {
  forms,
  tables,
  typography,
  colors
} = constants;

const {
  default: styled,
} = Styled;

const {
  remcalc
} = fncs;

module.exports = styled.div`
  font-family: 'LibreFranklin', sans-serif;
  font-size: 1rem;
  line-height: 1.5;
  color: ${colors.fonts.regular};
  background-color: #FFFFFF;

  /**************************************************************************
   *                              NORMALIZE.CSS                             *
   **************************************************************************/

  & article,
  & aside,
  & details,
  & figcaption,
  & figure,
  & footer,
  & header,
  & main,
  & menu,
  & nav,
  & section,
  & summary {
    display: block;
  }

  & audio,
  & canvas,
  & progress,
  & video {
    display: inline-block;
  }

  & audio:not([controls]) {
    display: none;
    height: 0;
  }

  & progress {
    vertical-align: baseline;
  }

  & template,
  & [hidden] {
    display: none;
  }

  & a {
    background-color: transparent;
    -webkit-text-decoration-skip: objects;
  }

  & a:active,
  & a:hover {
    outline-width: 0;
  }

  & abbr[title] {
    border-bottom: none;
    text-decoration: underline;
    text-decoration: underline dotted;
  }

  & b,
  & strong {
    font-weight: inherit;
  }

  & b,
  & strong {
    font-weight: bolder;
  }

  & dfn {
    font-style: italic;
  }

  & h1 {
    margin: 0.67em 0;
  }

  & mark {
    background-color: #ff0;
    color: #000;
  }

  & small {
    font-size: 80%;
  }

  & sub,
  & sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  & sub {
    bottom: -0.25em;
  }

  & sup {
    top: -0.5em;
  }

  & img {
    border-style: none;
  }

  & svg:not(:root) {
    overflow: hidden;
  }

  & code,
  & kbd,
  & pre,
  & samp {
    font-family: monospace, monospace;
    font-size: 1em;
  }

  & figure {
    margin: 1em ${remcalc(40)};
  }

  & hr {
    -webkit-box-sizing: content-box;
            box-sizing: content-box;
    height: 0;
    overflow: visible;
  }

  & button,
  & input,
  & optgroup,
  & select,
  & textarea {
    font: inherit;
    margin: 0;
  }

  & optgroup {
    font-weight: bold;
  }

  & button,
  & input {
    overflow: visible;
  }

  & button,
  & select {
    text-transform: none;
  }

  & button,
  & [type="button"],
  & [type="reset"],
  & [type="submit"] {
    -webkit-appearance: button;
  }

  & button::-moz-focus-inner,
  & [type="button"]::-moz-focus-inner,
  & [type="reset"]::-moz-focus-inner,
  & [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  & button:-moz-focusring,
  & [type="button"]:-moz-focusring,
  & [type="reset"]:-moz-focusring,
  & [type="submit"]:-moz-focusring {
    outline: ${remcalc(1)} dotted ButtonText;
  }

  & fieldset {
    border: ${remcalc(1)} solid #c0c0c0;
    margin: 0 ${remcalc(2)};
    padding: 0.35em 0.625em 0.75em;
  }

  & legend {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    color: inherit;
    display: table;
    max-width: 100%;
    padding: 0;
    white-space: normal;
  }

  & textarea {
    overflow: auto;
  }

  & [type="checkbox"],
  & [type="radio"] {
    -webkit-box-sizing: border-box;
            box-sizing: border-box;
    padding: 0;
  }

  & [type="number"]::-webkit-inner-spin-button,
  & [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  & [type="search"] {
    -webkit-appearance: textfield;
    outline-offset: ${remcalc(-2)};
  }

  & [type="search"]::-webkit-search-cancel-button,
  & [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  & ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }

  & ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }

  /**************************************************************************
   *                             BOOTSTRAP REBOOT                           *
   **************************************************************************/

  & *,
  & *::before,
  & *::after {
    box-sizing: inherit;
  }

  & @-ms-viewport {
    width: device-width;
  }
  & [tabindex="-1"]:focus {
    outline: none !important;
  }

  /**
   * Typography
   */

  & h1,
  & h2,
  & h3,
  & h4,
  & h5,
  & h6 {
    margin-top: 0;
    margin-bottom: .5rem;
  }

  & p {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  & abbr[title],
  & abbr[data-original-title] {
    cursor: help;
    border-bottom: ${remcalc(1)} dotted ${typography.abbrBorderColor};
  }

  & address {
    margin-bottom: 1rem;
    font-style: normal;
    line-height: inherit;
  }

  & ol,
  & ul,
  & dl {
    margin-top: 0;
    margin-bottom: 1rem;
  }

  & ol ol,
  & ul ul,
  & ol ul,
  & ul ol {
    margin-bottom: 0;
  }

  & dt {
    font-weight: ${typography.dtFontWeight};
  }

  & dd {
    margin-bottom: .5rem;
    margin-left: 0; /* Undo browser default */
  }

  & blockquote {
    margin: 0 0 1rem;
  }

  /**
   * Links
   */

  & a {
    color: ${colors.brandPrimaryLink};
    text-decoration: underline;

    &:focus,
    &:hover {
      text-decoration: none;
    }

    &:focus {
      outline: ${remcalc(5)} auto -webkit-focus-ring-color;
      outline-offset: ${remcalc(-2)};
    }
  }

  & a:not([href]):not([tabindex]) {
    color: inherit;
    text-decoration: none;

    &:focus,
    &:hover {
      text-decoration: none;
    }

    &:focus {
      outline: none;
    }
  }

  /**
   * Code
   */

  & pre {
    margin-top: 0;
    margin-bottom: 1rem;
    overflow: auto;
  }

  /**
   * Figures
   */

  & figure {
    margin: 0 0 1rem;
  }

  /**
   * Images
   */

  & img {
    vertical-align: middle;
  }

  & [role="button"] {
    cursor: pointer;
  }

  & a,
  & area,
  & button,
  & [role="button"],
  & input,
  & label,
  & select,
  & summary,
  & textarea {
    touch-action: manipulation;
  }

  /**
   * Tables
   */

  & table {
    border-collapse: collapse;
    background-color: ${tables.bg};
  }

  & caption {
    padding-top: ${tables.cellPadding};
    padding-bottom: ${tables.cellPadding};
    color: ${typography.textMuted};
    text-align: left;
    caption-side: bottom;
  }

  & th {
    text-align: left;
  }

  /**
   * Forms
   */

  & label {
    display: inline-block;
    margin-bottom: .5rem;
  }

  & button:focus {
    outline: ${remcalc(1)} dotted;
    outline: ${remcalc(5)} auto -webkit-focus-ring-color;
  }

  & input,
  & button,
  & select,
  & textarea {
    line-height: inherit;
  }

  & input[type="radio"],
  & input[type="checkbox"] {
    &:disabled {
      cursor: ${forms.cursorDisabled};
    }
  }

  & input[type="date"],
  & input[type="time"],
  & input[type="datetime-local"],
  & input[type="month"] {
    -webkit-appearance: listbox;
  }

  & textarea {
    resize: vertical;
  }

  & fieldset {
    min-width: 0;
    padding: 0;
    margin: 0;
    border: 0;
  }

  & legend {
    display: block;
    width: 100%;
    padding: 0;
    margin-bottom: .5rem;
    font-size: 1.5rem;
    line-height: inherit;
  }

  & input[type="search"] {
    -webkit-appearance: none;
  }
`;

module.exports.global = require('./global');
