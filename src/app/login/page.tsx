"use client";

import { useLoginMutation } from '@/libs/redux-store/apiSlice/authApi';
import { useAuth } from '@/utils/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type LoginFormInputs = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormInputs>();
  const [login, { isLoading, isError }] = useLoginMutation();
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    await login({ username: data.email, password: data.password })
      .unwrap()
      .then((payload) => {
        reset();
        router.push("/");
      })
      .catch((error: unknown) => {
        setErrorMessage("Invalid email/password");
      });
  };

  if (isAuthenticated) {
    router.push("/");
  }

  return (
    <div className='flex justify-center pt-5'>

      <form onSubmit={handleSubmit(onSubmit)} className="flex  w-[60%] flex-col gap-4 rounded-box bg-base-200 p-6 max-w-md">
        <h1 className="text-3xl font-bold self-center">Log in</h1>


        <label className="form-control">
          <div className="label">
            <span className="label-text">Email</span>
          </div>

          <input
            id="email"
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="input input-bordered"
          />
          {errors.email && <span className="mt-1 text-sm text-red-500">{errors.email.message}</span>}
        </label>

        <label className="form-control">
          <div className="label">
            <span className="label-text">Password</span>
            <a className="label-text link link-accent">Forgot password?</a>
          </div>

          <input
            id="password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            className="input input-bordered"
          />
          {errors.password && <span className="mt-1 text-sm text-red-500">{errors.password.message}</span>}
        </label>


        {errorMessage.length > 0 && <span className="mt-1 text-sm text-red-500">{errorMessage}</span>}

        {/* <div className="form-control">
          <label className="cursor-pointer label self-start gap-2">
            <input type="checkbox" className="checkbox" />
            <span className="label-text">Remember me</span>
          </label>
        </div> */}

        <button className="btn btn-primary" disabled={isLoading}>Log in</button>

        <span className="self-center">
          Don't have an account? 
          <a className="link link-secondary">Register</a>
        </span>
      </form>
    </div>
  );
}
