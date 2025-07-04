import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "@/app/reset/reset.scss";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
});

const robotoMono = Roboto({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Registration",
  description: "Generated by create next app",
};

export default function RootLayoutUserRegistration({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main
      style={{ backgroundColor: "white", height: "100vh" }}
      className={`${roboto.variable} ${robotoMono.variable}`}>
      {children}
    </main>
  );
}
