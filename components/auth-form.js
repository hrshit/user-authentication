"use client"
import { signup } from '@/actions/auth-actions';
import Link from 'next/link';
import {useFormState} from "react-dom";

export default function AuthForm() {
  const [formstate, formAction] = useFormState(signup, {})
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </p>
      {formstate.errors && (
        <ul id='form-errors'>
          {Object.keys(formstate.errors).map((error) => (
              <li key={error}> {formstate.errors[error]} </li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">
          Create Account
        </button>
      </p>
      <p>
        <Link href="/">Login with existing account.</Link>
      </p>
    </form>
  );
}
