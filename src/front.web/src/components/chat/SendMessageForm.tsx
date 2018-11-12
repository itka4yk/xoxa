// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { as, ISendMessageForm } from 'front.core';

const SendMessageForm = (props: ISendMessageForm) => (
  <div className="chat-input-wrapper">
    <textarea onChange={e => props.onBodyChange(e.target.value)}/>
    <button type="submit" onClick={props.onMessageSend}>Send</button>
  </div>
);

export default as<React.ComponentClass>(SendMessageForm);
