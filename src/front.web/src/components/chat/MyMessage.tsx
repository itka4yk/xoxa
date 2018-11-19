import * as React from 'react';
import { IChatMessageDto } from 'api.contract';

export const MyMessage = (props: IChatMessageDto) => (
  <li className="clearfix">
    <div className="message-data align-right">
      <span className="message-data-time">{new Date(props.timestamp).toLocaleString()}</span>
      <br />
      <span className="message-data-name">{props.senderId}</span>
      <i className="fa fa-circle me" />
    </div>
    <div className="message my-message">{props.body}</div>
  </li>
);
