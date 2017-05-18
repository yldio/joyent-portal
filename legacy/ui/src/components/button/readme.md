# Button

### Description
An HTML button element with styles and functionality applied according to props.

If no props are defined, a "primary" button with no routing capabilities will be 
rendered.

### Usage

```js
import Button from '@ui/components/button';

<div>
  <Button>Hello</Button>
  <Button primary>Primary</Button>
  <Button secondary>Secondary</Button>
  <Button disabled>Disabled</Button>
  <Button to='/hello'>To</Button>
  <Button href='/world'>href</Button>
</div>
```

### Properties
| propName | propType | defaultValue | isRequired |
|----------|----------|--------------|------------|
| href  | string     | -            |            |
| to    | string   | -            |           |
| secondary    | bool   | false            |           |
| disabled    | bool   | false            |           |
| tertiary    | bool   | false            |           |

## Roadmap
* `onClick` - click callback
* `label` - button accessibility tag