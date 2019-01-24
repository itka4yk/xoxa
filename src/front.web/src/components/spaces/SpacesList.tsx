// tslint:disable:jsx-no-lambda
// tslint:disable:jsx-no-multiline-js
import * as React from 'react';
import { ISpacesComponentProps } from 'front.core/lib/modules/spaces/containers';
import { as } from 'front.core';
import { observer } from 'mobx-react';
import { Button } from 'react-bootstrap';
import LinkButton from '../../containers/LinkButton';

const SpacesList = observer((props: ISpacesComponentProps) => (
  <>
    <LinkButton block to="/workspaces/create">
      Create new
    </LinkButton>
    {props.spaces.map(s => (
      <Button block active={s.active} onClick={() => props.onSpaceSelected(s.id)} key={s.id}>
        {s.name}
      </Button>
    ))}
  </>
));

export default as<React.ComponentClass>(SpacesList);
