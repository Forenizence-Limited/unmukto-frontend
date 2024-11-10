import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";

import ReduxStoreProvider from '@/libs/redux-store/ReduxStoreProvider';

import { Footer } from '@/components/Footer';
import Navbar from '@/components/Navbar';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Unmukto Bangladesh",
  description: "Break Shackles, Embrace Freedom",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxStoreProvider>
          <div className="container mx-auto">
            <Navbar />
            {children}
            <Footer />
          </div>
        </ReduxStoreProvider>
      </body>
    </html>
  );
}