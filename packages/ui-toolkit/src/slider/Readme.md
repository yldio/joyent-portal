### Double Range Slider

```
    <Slider
      minValue={0.25}
      maxValue={8}
      step={0.25}
      value={{ min: 0.25, max: 8 }}
      onChangeComplete={value => console.log(value)}
      onChange={value => console.log(value)}
    >vCPUs</Slider>
```