// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { ISpacesComponentProps } from 'front.core/lib/modules/spaces/containers';
import { as } from 'front.core';
import { observer } from 'mobx-react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';

const SpacesTabBar = observer((props: ISpacesComponentProps) => (
  <ButtonToolbar>
    <ButtonGroup>
      {props.spaces.map(s => (
        <Button active={s.active} onClick={() => props.onSpaceSelected(s.name)} key={s.id}>
          {s.name}
        </Button>
      ))}
    </ButtonGroup>
  </ButtonToolbar>
));

export default as<React.ComponentClass>(SpacesTabBar);
