// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { ISpacesComponentProps } from 'front.core/lib/modules/spaces/containers';
import { as } from 'front.core';
import { observer } from 'mobx-react';
import { ButtonGroup, Button, DropdownButton, MenuItem, ButtonToolbar } from 'react-bootstrap';

const SpacesTabBar = observer((props: ISpacesComponentProps) => (
  <ButtonToolbar>
    <ButtonGroup>
      <DropdownButton title="..." id="bg-nested-dropdown">
        <MenuItem href="/workspaces/create">Create new</MenuItem>
        <MenuItem href="/workspaces/settings">Settings</MenuItem>
      </DropdownButton>
    </ButtonGroup>
    <ButtonGroup>
      {props.spaces.map(s => (
        <Button
          active={s.active}
          onClick={() => props.onSpaceSelected(s.name)}
          key={s.id}
        >
          {s.name}
        </Button>
      ))}
    </ButtonGroup>
  </ButtonToolbar>
));

export default as<React.ComponentClass>(SpacesTabBar);
