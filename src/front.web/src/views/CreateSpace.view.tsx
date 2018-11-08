import * as React from 'react';
import CreateSpace from '../components/spaces/CreateSpace';
import CreateSpaceContainer from 'front.core/lib/modules/spaces/containers/create.container';

export const CreateSpaceView = () => (
  <div>
    <CreateSpaceContainer>
      <CreateSpace />
    </CreateSpaceContainer>
  </div>
);
