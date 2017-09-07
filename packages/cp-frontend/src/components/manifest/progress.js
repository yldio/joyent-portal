import React from 'react';

import {
  Progressbar,
  ProgressbarItem,
  ProgressbarButton
} from 'joyent-ui-toolkit';

const Progress = ({ stage, create, edit }) => {
  const _nameCompleted = stage !== 'name';
  const _nameActive = stage === 'name';

  const _name = !create ? null : (
    <ProgressbarItem>
      <ProgressbarButton
        zIndex="10"
        completed={_nameCompleted}
        active={_nameActive}
        first
      >
        Name the group
      </ProgressbarButton>
    </ProgressbarItem>
  );

  const _manifestCompleted = ['environment', 'review'].indexOf(stage) >= 0;
  const _manifestActive = create ? stage === 'manifest' : stage === 'edit';

  const _manifest = (
    <ProgressbarItem>
      <ProgressbarButton
        zIndex="9"
        completed={_manifestCompleted}
        active={_manifestActive}
        first={edit}
      >
        Define Services
      </ProgressbarButton>
    </ProgressbarItem>
  );

  const _environmentCompleted = stage === 'review';
  const _environmentActive = stage === 'environment';

  const _environment = (
    <ProgressbarItem>
      <ProgressbarButton
        zIndex="8"
        completed={_environmentCompleted}
        active={_environmentActive}
      >
        Define Environment
      </ProgressbarButton>
    </ProgressbarItem>
  );

  const _reviewActive = stage === 'review';

  const _review = (
    <ProgressbarItem>
      <ProgressbarButton zIndex="7" active={_reviewActive} last>
        Review and deploy
      </ProgressbarButton>
    </ProgressbarItem>
  );

  return (
    <Progressbar>
      {_name}
      {_manifest}
      {_environment}
      {_review}
    </Progressbar>
  );
};

export default Progress;
