"use client";
import React from "react";
import { SessionProvider } from "next-auth/react";
import "../../i18n";
interface Props {
  children: React.ReactNode;
  session?: any;
}

export const SessionProvideLayout: React.FC<Props> = ({
  children,
  session,
}) => {
  return <SessionProvider session={session}>{children}</SessionProvider>;
};
