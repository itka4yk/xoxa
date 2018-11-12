import * as React from 'react';
import SpacesListContainer from 'front.core/lib/modules/spaces/containers/spacesTabBar.container';
import SpacesList from '../components/spaces/SpacesList';

export const WorkspacesView = () => (
  <div>
    <h3>Workspace list</h3>
    <SpacesListContainer>
      <SpacesList />
    </SpacesListContainer>
  </div>
);
