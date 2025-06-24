"use client";
import React from "react";
import { Container } from "@/app/components";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Styles from "./sass/pageLogin.module.scss";
import LoginForm from "./components/login";
import RegisterForm from "./components/register";

import Link from "next/link";
export default function Registration() {
  const { data: session, status } = useSession();
  const router = useRouter();
  React.useEffect(() => {
    if (status === "authenticated") {
      router.push("https://imdx.vercel.app/");
    }
  }, [session, status]);
  console.log(session, "session");
  const [state, setState] = React.useState<"login" | "register">("login");
  const onSwitch = () => {
    setState(state === "login" ? "register" : "login");
  };
  return (
    <Container classname={Styles.container}>
      <div className={Styles.container__content}>
        <div className={Styles.logo}>
          <Link href={`/`}>
            <p>IMDX</p>
          </Link>
        </div>
        <div className={Styles.form}>
          {state === "login" ? <LoginForm /> : <RegisterForm />}{" "}
          <div className={Styles.switch}>
            <div>
              {state === "login" ? (
                <div className={Styles.registerbtn}>
                  <div className={Styles.posAbs}>
                    <p>New to IMDx?</p>
                  </div>
                  <button onClick={onSwitch}>Create your IMDx account</button>
                </div>
              ) : (
                <div className={Styles.loginBtn}>
                  Already have an account?{" "}
                  <span onClick={onSwitch}>Sign in</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
