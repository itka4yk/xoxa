import * as React from 'react';

export const OtherMessage = () => (
  <li className="clearfix">
    <div className="message-data align-left">
      <span className="message-data-time">10:10 AM, Today</span>
      <br />
      <span className="message-data-name">Olia</span>
      <i className="fa fa-circle me" />
      <br />
    </div>
    <div>
      <div className="message other-message">
        Hi Vincent, how are you? How is the project coming along?
      </div>
    </div>
  </li>
);
