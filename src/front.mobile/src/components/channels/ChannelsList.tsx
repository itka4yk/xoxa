// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { IChannelsListProps } from 'front.core/lib/modules/channels/containers';
import { as } from 'front.core';
import { Channel } from '../chat/ChannelItem';

const ChannelsList = ({ channels, onSelect }: IChannelsListProps) =>
  channels.map(c => <Channel key={c.id} {...c} onSelect={() => onSelect(c.id)} />);

export default as<React.ComponentClass>(ChannelsList);
