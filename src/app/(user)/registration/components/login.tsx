"use client";
import React from "react";
import Styles from "../sass/authModel.module.scss";
import { formLoginSchema, TformLoginValues } from "./schemas";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput } from "@/app/shared/ui";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const onSubmit = async (data: TformLoginValues) => {
    try {
      const res = await signIn("credentials", {
        ...data,
        redirect: false,
        callbackUrl: "https://imdx.vercel.app/",
      });
      if (res?.ok && res.url) {
        router.push(res.url);
      } else {
        console.log("Cannot Enter To account");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const form = useForm<TformLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <FormProvider {...form}>
      <form className={Styles.container} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={Styles.container__content}>
          <h1>Sign In</h1>
          <div className={Styles.inputs}>
            <FormInput label="E-Mail" name="email" required={true} />
            <FormInput
              label="Password"
              name="password"
              required={true}
              type="password"
            />
          </div>{" "}
          <button type="submit" className={Styles.btn}>
            {form.formState.isSubmitting ? "Enter.." : "login"}
          </button>
        </div>{" "}
      </form>
    </FormProvider>
  );
};

export default LoginForm;
