import * as React from 'react';
import SpacesListContainer from 'front.core/lib/modules/spaces/containers/spacesTabBar.container';
import SpacesList from '../components/spaces/SpacesList';

export const WorkspacesView = () => (
  <SpacesListContainer>
    <SpacesList />
  </SpacesListContainer>
);
