### Double Range Slider

```
    <Slider
      minValue={0.25}
      maxValue={8}
      step={0.25}
      value={{ min: 4, max: 4 }}
      onChangeComplete={value => console.log(value)}
      onChange={value => console.log(value)}
    >vCPUs</Slider>
```
