// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { IRegisterComponentProps } from 'front.core/lib/modules/auth/containers';
import { as } from 'front.core';
import { Button, FormControl } from 'react-bootstrap';

const Register = (props: IRegisterComponentProps) => (
  <form>
    <h3>Register View</h3>
    <FormControl placeholder="email" onChange={e => props.onEmailChange(e.target.value)} />
    <FormControl
      type="password"
      placeholder="password"
      onChange={e => props.onPasswordChange(e.target.value)}
    />
    <FormControl
      type="password"
      placeholder="password"
      onChange={e => props.onPasswordChange(e.target.value)}
    />
    <Button onClick={props.onRegisterSubmit}>Register</Button>
  </form>
);

export default as<React.ComponentClass>(Register);
