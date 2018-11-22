import * as React from 'react';

interface IProps {
  name: string;
  onSelect(): void;
}

export const Member = (props: IProps) => (
  <li className="chat-member" onClick={props.onSelect}>
    <img src={`https://ui-avatars.com/api/?name=${props.name}&rounded=true&size=32`} alt="avatar" />
    <div className="name">{props.name}</div>
  </li>
);
