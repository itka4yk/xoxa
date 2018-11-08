import * as React from 'react';

export const MyMessage = () => (
  <li className="clearfix">
    <div className="message-data align-right">
      <span className="message-data-time">10:10 AM, Today</span>
      <br />
      <span className="message-data-name">Olia</span>
      <i className="fa fa-circle me" />
    </div>
    <div className="message my-message">
      Hi Vincent, how are you? How is the project coming along?
    </div>
  </li>
);
