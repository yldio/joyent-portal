#### Large Type Scale

```jsx
const React = require('react');
const H1 = require('/').H1;
const H2 = require('/').H2;
const H3 = require('/').H3;
const H4 = require('/').H4;
const P = require('/').P;
const Small = require('/').Small;

const styles = {
  color: '#979797',
  marginBottom: '22px',
  display: 'block',
  marginTop: '6px',
  padding: 0
};

<div>
  <H1>H1 - Don’t say it, shout it</H1>
  <Small style={styles}>Libre Franklin Regular - 36px with 45px leading</Small>
  <H2>H2 - Breadcrumb? More like breadloaf</H2>
  <Small style={styles}>Libre Franklin Regular - 24px with 30px leading</Small>
  <H3>H3 - Your friendly neighbourhood workhorse</H3>
  <Small style={styles}>Libre Franklin Regular - 21px with 26px leading</Small>
  <H4>H4 - Bodies bigger brother</H4>
  <Small style={styles}>Libre Franklin Semibold - 15px with 24px leading</Small>
  <P>P - Body copy</P>
  <Small style={styles}>Libre Franklin Regular - 15px with 24px leading</Small>
  <Small> C - Caption text</Small>
  <Small style={styles}>Libre Franklin Regular - 13px with 18px leadings</Small>
</div>;
```
