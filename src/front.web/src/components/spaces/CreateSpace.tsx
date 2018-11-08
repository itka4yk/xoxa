// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { as, ICreateSpaceComponent } from 'front.core';
import { Button, FormControl } from 'react-bootstrap';

const CreateSpace = (props: ICreateSpaceComponent) => (
  <form>
    <h3>Create new Space</h3>
    <FormControl placeholder="name" onChange={e => props.onNameChange(e.target.value)} />
    <Button onClick={props.onFormSubmit}>Create</Button>
  </form>
);

export default as<React.ComponentClass>(CreateSpace);
