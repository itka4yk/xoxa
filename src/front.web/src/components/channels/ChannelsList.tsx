// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { IChannelsListProps } from 'front.core/lib/modules/channels/containers';
import { as } from 'front.core';
import { Channel } from '../chat/ChannelItem';

const ChannelsList = ({ channels, onSelect }: IChannelsListProps) => (
  <ul className="list">
    {channels.map(c => <Channel key={c.id} {...c} onSelect={() => onSelect(c.id)}/>)}
  </ul>
);

export default as<React.ComponentClass>(ChannelsList);
