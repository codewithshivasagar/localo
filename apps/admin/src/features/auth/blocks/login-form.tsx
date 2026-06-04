'use client';

import { FormEvent, useState } from 'react';
import { Alert, Button, EmailInput, FormField, PasswordInput } from '@localo/ui';
import { ADMIN_AUTH_COPY } from '../config';
import { useAdminLogin } from '../hooks';
import type { LoginFormValues } from '../schemas';

const initialValues: LoginFormValues = {
  email: '',
  password: ''
};

export function LoginForm() {
  const [values, setValues] = useState<LoginFormValues>(initialValues);
  const { errors, formError, isSubmitting, login } = useAdminLogin();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void login(values);
  };

  return (
    <form className="space-y-5" noValidate onSubmit={handleSubmit}>
      {formError ? <Alert description={formError} size="sm" variant="destructive" /> : null}

      <FormField error={errors.email} htmlFor="admin-email" label={ADMIN_AUTH_COPY.emailLabel} required>
        <EmailInput
          disabled={isSubmitting}
          error={Boolean(errors.email)}
          id="admin-email"
          leftIcon={<span aria-hidden="true">✉</span>}
          onChange={(event) => setValues((current) => ({ ...current, email: event.target.value }))}
          placeholder="Enter your email"
          value={values.email}
        />
      </FormField>

      <FormField error={errors.password} htmlFor="admin-password" label={ADMIN_AUTH_COPY.passwordLabel} required>
        <PasswordInput
          disabled={isSubmitting}
          error={Boolean(errors.password)}
          id="admin-password"
          leftIcon={<span aria-hidden="true">▣</span>}
          onChange={(event) => setValues((current) => ({ ...current, password: event.target.value }))}
          placeholder="Enter your password"
          value={values.password}
        />
      </FormField>

      <Button fullWidth isLoading={isSubmitting} loadingLabel={ADMIN_AUTH_COPY.loadingLabel} size="lg" type="submit">
        <span>{ADMIN_AUTH_COPY.submitLabel}</span>
        <span aria-hidden="true">→</span>
      </Button>
    </form>
  );
}
