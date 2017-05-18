In the mockups, the spacing between elements is done through a baseline grid.

What that means is that spacing is measured in `units` over a `base`. I.e. `1.5 unit` where the base is `6px` corresponds to `9px`.

{insert image from sketch}

To allow a declarative way of defining spacing in every component in our UI framework, a composer was written that styles each component instance with based on the props passed to it. E.g.:

```html
<Button margin='2'>Hello World</Button>
```

Is going to translate into a `<Button />` that has `12px` of margin.

What enables this is the [`Baseline` composer](https://github.com/yldio/joyent-portal/blob/a5774063ed8caf2569aff2905af2d7dca7a01a52/ui/src/shared/composers/index.js#L51). 

The Baseline composer is essentially an [HOC](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750): It exposes a function that accepts a Component as a parameter. That component is then wrapped in a [styled-component](https://github.com/styled-components/styled-components#overriding-component-styles). 

The `styled-component` that wraps the Component just goes through a list of supported rules - see list below. From each rule it does the match to the corresponding prop and calculates the `rem`.

List of supported props:

 - `border`
 - `margin`
 - `marginTop`
 - `marginRight`
 - `marginBottom`
 - `marginLeft`
 - `padding`
 - `paddingTop`
 - `paddingRight`
 - `paddingBottom`
 - `paddingLeft`
 - `borderTopWidth`
 - `borderRightWidth`
 - `borderBottomWidth`
 - `borderLeftWidth`

To use this composer, you just do it as you would with any other HOC:

```js
// component implementation
const Button = (props) => (
  <button>my button</button>
);

// export Button wrapped
export default Baseline(Button);
```

Whoever required that `<Button />`, will be able to declare any of the properties especified above and have the style of the component be applied accordingly.


#### examples

```
const Button = require('../button').default;

<span>
  <Button marginRight='1'>margin-right: 1</Button>
  <Button marginRight='2'>margin-right: 2</Button>
  <Button marginRight='3'>margin-right: 3</Button>
  <Button marginRight='4'>margin-right: 4</Button>
  <Button>hello</Button>
</span>
```