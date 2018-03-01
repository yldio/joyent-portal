#### Default Superscript

The default superscript was intially designed to offer supporting information on the service menu regarding service status. It can used as a typographic ident to support titles and names without the need for iconography.

```jsx
// Name: Example
const React = require('react');
const Sup = require('/').Sup;
const P = require('/').P;
const Small = require('/').Small

const styles = {
  color: '#979797',
  marginBottom: '22px',
  display: 'block',
  marginTop: '6px',
  padding: 0
};

<div>
    <P>
        Superscript Example
        <Sup>Superscript</Sup>
    </P>
    <Small style={styles}>Libre Franklin Semi Bold - 8px with 12px leading</Small>
</div>
```

#### Alert Superscript

The Alert variation of superscript is to be used as an excliamation, to announce supporting information that requires action, such as ‘New service’ or ‘Available now’.

```jsx
// Name: Example
const React = require('react');
const Sup = require('/').Sup;
const P = require('/').P;
const Small = require('/').Small

const styles = {
  color: '#979797',
  marginBottom: '22px',
  display: 'block',
  marginTop: '6px',
  padding: 0
};

<div>
    <P>
        Superscript Example
        <Sup alert>Alert Superscript</Sup>
    </P>
    <Small style={styles}>Libre Franklin Semi Bold - 8px with 12px leading</Small>
</div>
```

#### Badge Superscript

The badge variation of superscript is for when a specific element of information is repeated numberous times in one page/component. In being more visual, it becomes an ‘ident’ in information dense areas to allow for clear recognition.

```jsx
// Name: Example
const React = require('react');
const Sup = require('/').Sup;
const P = require('/').P;
const Small = require('/').Small

const styles = {
  color: '#979797',
  marginBottom: '22px',
  display: 'block',
  marginTop: '6px',
  padding: 0
};

<div>
    <P>
        Superscript Example
        <Sup badge>SSD</Sup>
    </P>
    <Small style={styles}>Libre Franklin Semi Bold - 8px with 12px leading</Small>
</div>
```
