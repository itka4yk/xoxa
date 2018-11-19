import * as React from 'react';
import { IChatMessageDto } from 'api.contract';

export const OtherMessage = (props: IChatMessageDto) => (
  <li className="clearfix">
    <div className="message-data align-left">
      <span className="message-data-time">{new Date(props.timestamp).toLocaleString()}</span>
      <br />
      <span className="message-data-name">{props.senderId}</span>
      <i className="fa fa-circle me" />
      <br />
    </div>
    <div>
      <div className="message other-message">{props.body}</div>
    </div>
  </li>
);
