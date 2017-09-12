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

### Normal Slider

```
    <Slider
      minValue={10}
      maxValue={100}
      step={5}
      value={0}
      onChangeComplete={value => console.log(value)}
      onChange={value => console.log(value)}
    >Price</Slider>
```
