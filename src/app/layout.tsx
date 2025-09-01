"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { RefreshProvider } from "@/lib/context/refresh-context";
import "./globals.css";

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
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000,
            gcTime: 300000,
            retry: 2,
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <html lang="en">
      <head>
        <title>Crypto News - Solana Trending Pools</title>
        <meta
          name="description"
          content="Track trending Solana pools and token information"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryClientProvider client={queryClient}>
          <RefreshProvider>{children}</RefreshProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
