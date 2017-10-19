```
const React = require('react');
const { default: Progressbar } = require('./index');
const { default: ProgressbarButton } = require('./button');
const { default: ProgressbarItem } = require('./item');

<Progressbar>
  <ProgressbarItem>
    <ProgressbarButton zIndex="10" completed first onClick={() => console.log("name")}>
      Name the group
    </ProgressbarButton>
  </ProgressbarItem>
  <ProgressbarItem>
    <ProgressbarButton zIndex="9" active onClick={() => console.log("define")}>
      Define services
    </ProgressbarButton>
  </ProgressbarItem>
  <ProgressbarItem>
    <ProgressbarButton zIndex="8" last onClick={() => console.log("review")}>
      Review and deploy
    </ProgressbarButton>
  </ProgressbarItem>
</Progressbar>
```
