import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginSchema, type LoginFormValues } from '../../schemas/auth.schema';
import { getAuthErrorMessage } from '../../services/auth.service';
import FormMessage from './FormMessage';
import PasswordInput from './PasswordInput';
import SubmitButton from './SubmitButton';

const field = (invalid: boolean) =>
  `w-full rounded-xl border bg-white px-3.5 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 ${invalid ? 'border-rose-500' : 'border-slate-200'}`;

export default function LoginForm({ onRegister }: { onRegister: () => void }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({ resolver: zodResolver(loginSchema), mode: 'onBlur' });

  const submit = async (values: LoginFormValues) => {
    setServerError(undefined);
    try {
      const user = await login(values);
      const target = user?.role === 'admin' ? '/dashboard' : '/home';
      navigate(target, {
        replace: true,
      });
    } catch (error) {
      setServerError(getAuthErrorMessage(error, 'login'));
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} noValidate className="space-y-5">
      <div>
        <label htmlFor="login-email" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
          Email Address
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
          className={field(Boolean(errors.email))}
        />
        <FormMessage>{errors.email?.message}</FormMessage>
      </div>
      <div>
        <label htmlFor="login-password" className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700">
          Password
        </label>
        <PasswordInput
          id="login-password"
          autoComplete="current-password"
          placeholder="Enter your password"
          aria-invalid={Boolean(errors.password)}
          hasError={Boolean(errors.password)}
          {...register('password')}
        />
        <FormMessage>{errors.password?.message}</FormMessage>
      </div>
      <FormMessage>{serverError}</FormMessage>
      <SubmitButton loading={isSubmitting}>Login</SubmitButton>
      <p className="text-center text-sm font-medium text-slate-500">
        Don&apos;t have an account?{' '}
        <button
          type="button"
          onClick={onRegister}
          className="font-bold text-blue-600 hover:text-blue-700 transition"
        >
          Register
        </button>
      </p>
    </form>
  );
}
