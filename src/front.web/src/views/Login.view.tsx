import * as React from 'react';
import { LoginContainer } from 'front.core/lib/modules/auth/containers';
import Login from '../components/auth/Login';

export const LoginView = () => (
  <div>
    <LoginContainer>
      <Login />
    </LoginContainer>
  </div>
);
