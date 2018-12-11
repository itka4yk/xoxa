import * as React from 'react';
import CreateSpace from '../components/spaces/CreateSpace';
import CreateChannelContainer from 'front.core/lib/modules/channels/containers/create.container';
import CreateChannelForm from '../components/channels/CreateChannelForm';
import { Text } from 'native-base';
import { RouteComponentProps } from 'react-router';

export const CreateChannelView = (props: RouteComponentProps) => (
  <CreateChannelContainer spaceId={props.match.params.spaceId}>
    <CreateChannelForm />
  </CreateChannelContainer>
);
