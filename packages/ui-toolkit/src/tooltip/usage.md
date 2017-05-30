```
const Tooltip = require('./index').default;
const TooltipButton = require('./button').default;
const TooltipDivider = require('./divider').default;

<div style={{ position: 'relative', height: '175px' }}>
  <Tooltip top='5px' left='60px'>
    <TooltipButton>Scale</TooltipButton>
    <TooltipButton>Restart</TooltipButton>
    <TooltipDivider />
    <TooltipButton>Stop</TooltipButton>
    <TooltipButton>Delete</TooltipButton>
  </Tooltip>
</div>
```
