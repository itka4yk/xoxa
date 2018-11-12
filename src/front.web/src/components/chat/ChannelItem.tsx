import * as React from 'react';

interface IProps {
  name: string;

  onSelect(): void;
}

export const Channel = (props: IProps) => (
  <li className="chat-member">
    <div className="name" onClick={props.onSelect}>{props.name}</div>
  </li>
);
