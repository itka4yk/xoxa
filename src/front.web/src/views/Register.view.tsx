import * as React from 'react';
import { RegisterContainer } from 'front.core/lib/modules/auth/containers';
import Register from '../components/auth/Register';

export const RegisterView = () => (
  <div>
    <RegisterContainer>
      <Register />
    </RegisterContainer>
  </div>
);
