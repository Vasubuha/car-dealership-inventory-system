import { useState } from 'react';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

export default function Authentication() {
  const [mode, setMode] = useState("login");

  return (
    <AuthLayout mode={mode}>
      {mode === 'login' ? (
        <LoginForm
          onRegister={() => setMode('register')}
        />
      ) : (
        <RegisterForm
          onLogin={() => setMode('login')}
        />
      )}
    </AuthLayout>
  );
}
