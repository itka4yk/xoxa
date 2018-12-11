import * as React from 'react';
import { IChatMessageDto } from 'api.contract';

export const MyMessage = (props: IChatMessageDto & { name: string }) => (
  <li className="clearfix">
    <div className="message-data align-right">
      <span className="message-data-time">{new Date(props.timestamp).toLocaleString()}</span>
      <br />
      <img
        src={`https://ui-avatars.com/api/?name=${props.name}&rounded=true&size=32`}
        alt="avatar"
      />
      <span className="message-data-name">{props.name}</span>
      <i className="fa fa-circle me" />
    </div>
    <div className="message my-message">{props.body}</div>
  </li>
);
