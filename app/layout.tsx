import type { Metadata } from "next";
import { Rubik, Geist } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik"
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist"
});

export const metadata: Metadata = {
  title: {
    default: process.env.APP_NAME!,
    template: `${process.env.APP_NAME} - %s`
  },
  applicationName: `${process.env.APP_NAME}`,
  description: `${process.env.APP_NAME} is a project and task manager for small teams — plan the work, assign it, and track it to done.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${geist.variable} h-full antialiased selection:text-white selection:bg-primary-500`}
    >
      <body className="min-h-full flex flex-col">
        {children}
      </body>
    </html>
  );
}
