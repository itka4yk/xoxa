// tslint:disable:jsx-no-lambda
import * as React from 'react';
import { ILoginComponentProps } from 'front.core/lib/modules/auth/containers';
import { as } from 'front.core';
import { Button, FormControl } from 'react-bootstrap';

const Login = (props: ILoginComponentProps) => (
  <form>
    <h3>Login View</h3>
    <FormControl placeholder="email" onChange={e => props.onEmailChange(e.target.value)} />
    <FormControl placeholder="password" onChange={e => props.onPasswordChange(e.target.value)} />
    <Button onClick={props.onLoginSubmit}>Login</Button>
  </form>
);

export default as<React.ComponentClass>(Login);
