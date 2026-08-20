import type { Metadata } from "next";
import { Rubik, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { env } from "@/src/lib/env";
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
  metadataBase: new URL(env.APP_URL),
  title: {
    default: env.APP_NAME,
    template: `${env.APP_NAME} - %s`
  },
  applicationName: `${env.APP_NAME}`,
  description: `${env.APP_NAME} is a project and task manager for small teams — plan the work, assign it, and track it to done.`,
  openGraph: {
    type: "website",
    title: env.APP_NAME,
    description: "Project and task management for small teams.",
    siteName: env.APP_NAME,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UpTask — Project and task management for small teams."
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: env.APP_NAME,
    description: "Project and task management for small teams.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} ${geist.variable} h-full antialiased selection:text-white selection:bg-primary-500`}
    >
      <body className="min-h-full">
        {children}
        <Toaster
          position="top-right"
          theme="light"
          richColors={true}
          closeButton={false}
          duration={5000}
        />
      </body>
    </html>
  );
}
