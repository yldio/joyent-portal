```
const Tooltip = require('./tooltip').default;
const TooltipButton = require('./button').default;
const TooltipDivider = require('./divider').default;

<div style={{ position: 'relative', height: '175px' }}>
  <Tooltip top='5px' left='55px'>
    <TooltipButton>Scale</TooltipButton>
    <TooltipButton>Restart</TooltipButton>
    <TooltipButton>Stop</TooltipButton>
    <TooltipDivider />
    <TooltipButton>Delete</TooltipButton>
  </Tooltip>
</div>
```
