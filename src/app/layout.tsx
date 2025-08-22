"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GlobalProvider } from "@/context/globalContext";
import ReactQueryProvider from "@/utils/reactQueryProvider";
import AppLayoutClient from "./AppLayoutClient";
import { Suspense, useEffect } from "react";
import { interceptorConfig } from "@/utils/httpClient";
import ToastNotification from "@/components/ToastNotification/page";
import { useRouter } from "next/navigation";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    interceptorConfig(router);
  }, []);

  return (
    <html lang="en">
      <head>
        <title>BerryBoost</title>
        <meta
          name="description"
          content="Looking for custom software development, MVP development and dedicated developers in the USA? BerryBoost offers a full-range of services from Engineering Innovation to custom software development, Graphic Design to 3D Animations, from Digital to AI Marketing, and world class BPO facilities."
        />
        <meta name="robots" content="index, follow" />

        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/css/react-phone-number-input/style.css" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-YNHCWD5XXN"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
      window.dataLayer = window.dataLayer || [];
      function gtag(){window.dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-YNHCWD5XXN');
    `,
          }}
        ></script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              url: "https://berryboost.us",
              logo: "https://berryboost.us/logo.png",
            }),
          }}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GlobalProvider>
          <ReactQueryProvider>
            <AppLayoutClient>
              <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
              <ToastNotification />
            </AppLayoutClient>
          </ReactQueryProvider>
        </GlobalProvider>
      </body>
    </html>
  );
}
