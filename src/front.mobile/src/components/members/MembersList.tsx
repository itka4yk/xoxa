// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { IMembersListProps } from 'front.core/lib/modules/members/containers';
import { as } from 'front.core';
import { Member } from './MemberListItem';

const MembersList = ({ channels, onSelect }: IMembersListProps) => channels.map(c => (
  <Member key={c.id} {...c} onSelect={() => onSelect(c.id)} />
));

export default as<React.ComponentClass>(MembersList);
