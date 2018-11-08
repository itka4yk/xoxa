// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { ICreateChannelFormProps } from 'front.core/lib/modules/channels/containers';
import { as } from 'front.core';
import { Button, FormControl } from 'react-bootstrap';

const CreateChannelForm = (props: ICreateChannelFormProps) => (
  <form>
    <h3>Create View</h3>
    <FormControl placeholder="name" onChange={e => props.onNameChange(e.target.value)} />
    <Button onClick={props.onFormSubmit}>+</Button>
  </form>
);

export default as<React.ComponentClass>(CreateChannelForm);
