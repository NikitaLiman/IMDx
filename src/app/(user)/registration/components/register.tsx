"use client";
import React from "react";
import Styles from "../sass/authModel.module.scss";
import { registerFormSchema, TformRegisterValues } from "./schemas";
import { CreateUser } from "@/app/actions";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/app/shared/ui";
import { signIn } from "next-auth/react";

const RegisterForm: React.FC = () => {
  const onSubmit = async (data: TformRegisterValues) => {
    try {
      await CreateUser({
        email: data.email,
        fullname: data.fullname,
        password: data.password,
      });
      await signIn("credentials", {
        redirect: true,
        email: data.email,
        password: data.password,
        callbackUrl: "/",
      });
      console.log("User Created");
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<TformRegisterValues>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: "",
      password: "",
      fullname: "",
      confirmPassword: "",
    },
  });
  return (
    <FormProvider {...form}>
      <form className={Styles.container} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={Styles.container__content}>
          <h1>Create Account</h1>
          <div className={Styles.inputs}>
            <FormInput label="Your name" name="fullname" required={true} />
            <FormInput label="E-Mail" name="email" required={true} />
            <FormInput
              label="Password"
              name="password"
              required={true}
              type="password"
            />
            <FormInput
              label="Re-enter password"
              name="confirmPassword"
              type="password"
              required={true}
            />
          </div>{" "}
          <button type="submit" className={Styles.btn}>
            {form.formState.isSubmitting
              ? "Enter.."
              : "Create your IMDX account X"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default RegisterForm;
