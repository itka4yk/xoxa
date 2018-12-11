import * as React from 'react';
import CreateChannelContainer from 'front.core/lib/modules/channels/containers/create.container';
import CreateChannelForm from '../components/channels/CreateChannelForm';
import { RouteComponentProps } from 'react-router';

export const CreateChannelView = (props: RouteComponentProps) => (
  <CreateChannelContainer spaceId={props.match.params.spaceId}>
    <CreateChannelForm />
  </CreateChannelContainer>
);
