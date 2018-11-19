// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { as, ICreateSpaceComponent } from 'front.core';
import { Button, FormControl } from 'react-bootstrap';
import LinkButton from '../../containers/LinkButton';

const CreateSpace = (props: ICreateSpaceComponent) => (
  <form>
    <h3>Create new Space</h3>
    <FormControl placeholder="name" onChange={(e: any) => props.onNameChange(e.target.value)} />
    <FormControl
      placeholder="admin name"
      onChange={(e: any) => props.onAdminNameChange(e.target.value)}
    />
    <Button onClick={props.onFormSubmit}>Create</Button>
    <LinkButton bsStyle="link" back>
      Back
    </LinkButton>
  </form>
);

export default as<React.ComponentClass>(CreateSpace);
